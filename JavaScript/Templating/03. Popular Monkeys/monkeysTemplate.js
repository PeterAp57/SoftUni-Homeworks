function showInfo(id) {
    const p = document.getElementById(id);
    if(p.style.display === "none"){
        p.style.display = "block";
    }else if(p.style.display === "block"){
        p.style.display = "none";
    }
}
$(async () => {
    const source = await fetch("http://127.0.0.1:5500/Temps/03.%20Popular%20Monkeys/monkeyTemp.hbs")
        .then(d => d.text())

    const template = Handlebars.compile(source);
    const context = { monkeyInfo: monkeys };
    const html = template(context);
    const conteiner = document.getElementById("content")
    conteiner.innerHTML = html;
})