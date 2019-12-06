export function getPartials() {
    return {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }
}

export function setHeaderInfo(context) {
    context.isLogged = sessionStorage.getItem("authtoken") !== null;
    context.fullName = sessionStorage.getItem("fullName");
}