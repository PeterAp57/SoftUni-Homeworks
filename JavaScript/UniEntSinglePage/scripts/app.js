import { get, post, put, del } from "./reqester.js";
(() => {

    const app = Sammy("#root", function () {
        this.use("Handlebars", "hbs");

        this.get("#/", function (context) {
            setHeader(context);
            if (context.isLogged) {
                get("appdata", "events", "Kinvey")
                    .then(data => {
                        context.events = data;
                        this.loadPartials(getPartials())
                            .partial("./views/home.hbs");
                    })
            } else {
                this.loadPartials(getPartials())
                    .partial("./views/home.hbs");
            }
        });

        this.get("#/login", function (context) {
            this.loadPartials(getPartials())
                .partial("./views/auth/login.hbs");
        });

        this.post("#/login", function (context) {
            const { username, password } = context.params;

            if (username && password) {
                post("user", "login", { username, password }, "Basic")
                    .then(res => {
                        saveAuthInfo(res);
                        context.redirect("#/");
                    })
            }
        });

        this.get("#/register", function (context) {
            this.loadPartials(getPartials())
                .partial("./views/auth/register.hbs")
        });

        this.post("#/register", function (context) {
            const { username, password, rePassword } = context.params;
            if (username && username.length > 2 && password && password.length > 5 && rePassword === password) {
                post("user", "", { username, password }, "Basic")
                    .then(res => {
                        saveAuthInfo(res);
                        context.redirect("#/");
                    })
                    .catch(console.error);
            }

        });

        this.get("#/logout", function (context) {
            post("user", "_logout", {}, "Kinvey")
                .then(() => {
                    sessionStorage.clear();
                    context.redirect("#/");
                })
                .catch(console.error);
        });

        this.get("#/create", function (context) {
            setHeader(context);
            this.loadPartials(getPartials())
                .partial("./views/events/createEvent.hbs");
        });

        this.post("#/create", function (context) {
            setHeader(context);
            const { name, dateTime, description, imageURL } = context.params
            const interestedPeople = 0;
            const organizer = context.username;
            if (name && dateTime && description && imageURL && name.length > 5 && description.length > 9) {
                post("appdata", "events", { name, dateTime, description, imageURL, organizer, interestedPeople }, "Kinvey")
                    .then(() => {
                        context.redirect("#/");
                    })
                    .catch(console.error);
            }
        });

        this.get("#/more/:id", function (context) {
            setHeader(context);
            const id = context.params.id;
            get("appdata", `events/${id}`, "Kinvey")
                .then(data => {
                    data.isCreator = sessionStorage.getItem("userId") === data._acl.creator;
                    context.events = data;
                    this.loadPartials(getPartials())
                        .partial("./views/events/infoEvent.hbs")
                })
                .catch(console.error);
        });

        this.get("#/edit/:id", function (context) {
            setHeader(context);
            const id = context.params.id;
            get("appdata", `events/${id}`, "Kinvey")
                .then(data => {
                    context.events = data;
                    this.loadPartials(getPartials())
                        .partial("./views/events/editEvent.hbs")
                })
                .catch(console.error);
        });

        this.post("#/edit/:id", function (context) {
            const id = context.params.id;
            const { name, dateTime, description, imageURL } = context.params
            if (name && dateTime && description && imageURL && name.length > 5 && description.length > 9) {
                put("appdata", `events/${id}`, { name, dateTime, description, imageURL }, "Kinvey")
                    .then(() => {
                        context.redirect(`#/`);
                    })
                    .catch(console.error);
            }
        });

        this.get("#/join/:id", function (context) {
            const id = context.params.id;
            get("appdata", `events/${id}`, "Kinvey")
                .then(data => {
                    let { name, dateTime, description, imageURL, interestedPeople } = data
                    interestedPeople += 1;
                    put("appdata", `events/${id}`, { name, dateTime, description, imageURL, interestedPeople }, "Kinvey")
                        .then(() => {
                            context.redirect(`#/`);
                        })
                        .catch(console.error);
                })
                .catch(console.error);
        });

        this.get("#/close/:id", function (context) {
            const id = context.params.id;
            del("appdata", `events/${id}`, "Kinvey")
                .then(() => {
                    context.redirect("#/");
                })
        });

        this.get("#/profile", function (context) {
            setHeader(context);
            get("appdata", `events`, "Kinvey")
                .then(data => {
                    context.events = data;
                    context.eventCount = getEventCount(data,sessionStorage.getItem("userId"));
                        this.loadPartials(getPartials())
                            .partial("./views/auth/profile.hbs");
                })
                .catch(console.error);

        });

    });
    function getEventCount(data,id) {
        let count = 0;
        data.forEach(e =>{
           if( e._acl.creator === id){
               count ++;
           }
        })
        return count;
    };
    function setHeader(context) {
        context.isLogged = sessionStorage.getItem("authtoken") !== null;
        context.username = sessionStorage.getItem("username");
    };
    function getPartials() {
        return {
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs",
        }
    };
    function saveAuthInfo(info) {
        sessionStorage.setItem("authtoken", info._kmd.authtoken);
        sessionStorage.setItem("username", info.username);
        sessionStorage.setItem("userId", info._id);
    };

    app.run();
})()