// Nqmah vreme da q dovursha shte q dovursha no dnes e krainiq srok i q puskam taka
import { get, post, put , del} from "./requester.js";
(() => {
    const partials = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs"
    }

    const app = new Sammy("#main", function () {
        this.use("Handlebars", "hbs");
        this.get("#/home", loadHome);
        this.get("#/", loadHome);
        this.get("#/about", function (context) {
            addSessionInfo(context);
            context.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/about/about.hbs")
                });
        });
        this.get("#/login", function (context) {
            addSessionInfo(context);
            partials["loginForm"] = "./templates/login/loginForm.hbs";
            this.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/login/loginPage.hbs")
                })
        });
        this.post("#/login", function (context){
            const { username, password } = context.params;

            post("user","login",{username, password},"Basic")
            .then(d=> d.json())
            .then(userInfo =>{
                sessionStorage.setItem("authtoken", userInfo._kmd.authtoken);
                sessionStorage.setItem("username", username);
                
                context.redirect("#/")
            })
            .catch(console.error);
        });
        this.get("#/register", function (context) {
            addSessionInfo(context);
            partials["registerForm"] = "./templates/register/registerForm.hbs";
            this.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/register/registerPage.hbs")
                })
        });
        this.post("#/register", function (context) {
            const { username, password, repeatPassword } = context.params;
            if (password === repeatPassword) {
                post("user","",{username, password},"Basic")
                .then(d =>{
                    context.redirect("#/login");
                }).catch(ex =>{
                   alert(ex);
                })
            }

        });
        this.get("#/logout",function(context){
            sessionStorage.clear();
            context.redirect("#/");
        })
        this.get("#/catalog", function(context){
            partials["team"] = "./templates/catalog/team.hbs";

            get("appdata","teams","Kinvey")
            .then(d=> d.json())
            .then(data =>{
                console.log(data)
                context.teams = data;
                this.loadPartials(partials)
                .then(function(){
                    this.partial("./templates/catalog/teamCatalog.hbs");
                });
            })
            .catch(console.error);
        })
        this.get("#/create",function(context){
            addSessionInfo(context);
            partials["createForm"] = "./templates/create/createForm.hbs";
            this.loadPartials(partials)
            .then(function(){
                this.partial("./templates/create/createPage.hbs");
            })
        })
        this.post("#/create",function(context){
            const {name, comment} = context.params;
            post("appdata","teams",{name,comment},"Kinvey")
            .then(data =>{
                context.redirect("#/catalog");
            })
            .catch(console.error);
        })
        function loadHome(context) {
            addSessionInfo(context);
            context.loadPartials(partials)
                .then(function () {
                    this.partial("./templates/home/home.hbs")
                });
        };
        function addSessionInfo(context) {
            context.username = sessionStorage.getItem("username");
            context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        }
    });


    app.run();
})()