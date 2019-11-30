(function solve() {
    document.getElementById("btnLoadTowns")
        .addEventListener("click", async function () {
            const towns = document.getElementById("towns").value.split(", ");
            const source = await fetch("http://127.0.0.1:5500/Temps/01.%20List%20Towns/towns.hbs")
                .then(r => r.text());
            if (towns !== null && source !== null) {
                const conteiner = document.getElementById("root");
                const temp = Handlebars.compile(source);
                const context = { towns };
                const html = temp(context);
                conteiner.innerHTML = html;
            }
        })

}());