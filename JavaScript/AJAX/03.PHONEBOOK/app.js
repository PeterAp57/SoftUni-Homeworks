function attachEvents() {
    const loadBtn = document.getElementById("btnLoad");
    const phonebookUl = document.getElementById("phonebook");
    const createBtn = document.getElementById("btnCreate");
    

    loadBtn.addEventListener("click",load());

    createBtn.addEventListener("click",function(){
        const phone = document.getElementById("phone");
        const person = document.getElementById("person");
        const temp = {
            person: person.value,
            phone: phone.value
        }

        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json',
        {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(temp)
        })
        .then(() => {
            phone.value = "";
            person.value = "";
            load();
        })
        .catch(errorHandler);
        
    })

    function errorHandler(ex){
        console.log(ex);
    }

    function load(){
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
        .then(r => r.json())
        .then(loadPhoneBook)
        .catch(errorHandler);
    }

    function loadPhoneBook(data){
        phonebookUl.innerHTML = '';
        Object.entries(data).forEach(([eId, phoneInfo]) => {
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.id = eId;
            const {person , phone} = phoneInfo;
            let li = document.createElement("li");
            li.textContent = `${person}: ${phone}`;
            li.appendChild(deleteBtn);
            phonebookUl.appendChild(li);
            deleteBtn.addEventListener("click",function(e){
                const deleteId = deleteBtn.id;
                fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${deleteId}.json`,{
                    method: "DELETE",
                }).then(()=>{
                    phonebookUl.removeChild(li);
                    load();
                })
            })
        });
    }
}

attachEvents();