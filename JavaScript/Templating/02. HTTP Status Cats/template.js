function show(id){
    const div = document.getElementsByClassName("status");
    const codes  = {
        100 : 0,
        200 : 1,
        204 : 2,
        301 : 3,
        304 : 4,
        400 : 5,
        404 : 6,
        406 : 7,
        410 : 8,
        500 : 9,
        511 : 10
    }
    const cat = (div[codes[id]]);
    if(cat.parentNode.childNodes[1].textContent === "Show status code"){
        cat.style.display = "block";
        cat.parentNode.childNodes[1].textContent = "Hide status code";
    }else if(cat.parentNode.childNodes[1].textContent === "Hide status code"){
        cat.style.display = "none";
        cat.parentNode.childNodes[1].textContent = "Show status code";
    }
//opredeleno e glupava ideqta s tezi hardkodnati stoinosti koito sochat kum obektite
//tova uspqh da izmislq sam inache vidqh kak Kiril go pravi na Exercise'a
}

(() => {
     renderCatTemplate();

     async function renderCatTemplate() {
         const source = await fetch("http://127.0.0.1:5500/Temps/02.%20HTTP%20Status%20Cats/allCats.hbs")
         .then(d => d.text());

         const temp = Handlebars.compile(source);
         const context = { cats : window.cats };
         console.log(context)
         const html = temp(context);
         document.getElementById("allCats").innerHTML = html;
     }
 
})()
