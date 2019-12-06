import { getPartials, setHeaderInfo} from "./shared.js";
import { get, post, put, del } from "../requester.js";

function saveAuthInfo(info) {
    sessionStorage.setItem("authtoken", info._kmd.authtoken);
    sessionStorage.setItem("fullName", `${info.firstName} ${info.lastName}`);
    sessionStorage.setItem("userId",info._id);
}

export function getRegister(context) {
    this.loadPartials(getPartials())
        .partial("./templates/autho/register.hbs")
};

export function postRegister(context) {
    const { firstName, lastName, username, password, repeatPassword } = context.params;

    if (firstName && lastName && username && password && password === repeatPassword) {
        post("user", "", { firstName, lastName, username, password }, "Basic")
            .then(res => {
                saveAuthInfo(res);
                context.redirect("/");
            })
            .catch(console.error);
    }
};

export function getLogin(context) {
    this.loadPartials(getPartials())
        .partial("./templates/autho/login.hbs");
};

export function postLogin(context) {
    const { username, password } = context.params;
    if (username && password) {
        post("user", "login", { username, password }, "Basic")
            .then(info => {
                saveAuthInfo(info);
                context.redirect("/");
            })
    }
};

export function logout(context) {
    post("user", "_logout ", {}, "Kinvey")
        .then(() => {
            sessionStorage.clear();
            context.redirect("/");
        })
        .catch(console.error);
};