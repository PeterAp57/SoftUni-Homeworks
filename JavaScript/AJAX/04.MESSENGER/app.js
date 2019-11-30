function attachEvents() {
    const textArea = document.getElementById("messages");
    const send = document.getElementById("submit");
    const refresh = document.getElementById("refresh");

    send.addEventListener("click", function(){
        const name = document.getElementById("author");
        const message = document.getElementById("content");
        const temp = {
            author: name.value,
            content: message.value
        }
        console.log("asds")
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`,{
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(temp)
        })
        .then(()=>{
            name.value = "";
            message.value = "";
            refreshMessage();
            console.log("vleznah")
        })
        .catch(errorHandler);
    });

    refresh.addEventListener("click", refreshMessage())

    function refreshMessage(){
        textArea.textContent = "";
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
        .then(r => r.json())
        .then(data => {
            Object.entries(data).forEach(e => {
                const {author , content} = e[1];
                
                textArea.textContent += `${author}: ${content}\n`;
            });
        })
        .catch(errorHandler);
    }

    function errorHandler(ex){
        console.log(ex);
    }
}

attachEvents();