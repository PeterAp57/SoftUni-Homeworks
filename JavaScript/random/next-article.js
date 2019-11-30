function getArticleGenerator(articles) {
    let x = document.getElementById("content");
    return function(){
        if(articles.length > 0){
            let y = document.createElement("p");
            y.textContent = articles[0];
            x.appendChild(y);
            articles = articles.slice(1)
        }
    }
}
