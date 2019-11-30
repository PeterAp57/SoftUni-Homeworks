import { get,post,put,del } from "./requestHandler.js";

const html ={
    "getAllBooks": () => document.getElementById("allBooks"),
    "getBookTitle": () => document.getElementById("title"),
    "getBookAuthor": () => document.getElementById("author"),
    "getBookIsbn": () => document.getElementById("isbn"),
    "getEditTitle": () => document.getElementById("editTitle"),
    "getEditAuthor": () => document.getElementById("editAuthor"),
    "getEditIsbn": () => document.getElementById("editIsbn"),
    "getEditId": () => document.getElementById("editId"),
}

const actions = {
    "loadBooks": async function(){
        try{
            const books = await get("appdata","books");
            const container = html.getAllBooks();
    const fragment = document.createDocumentFragment();
    container.innerHTML = "";
    books.forEach(book => {
        const tr = document.createElement("tr");
        const tdT = document.createElement("td");
        const tdA = document.createElement("td");
        const tdI = document.createElement("td");
        const tdBtn = document.createElement("td");
        const editBtn = document.createElement("button");
        const delBtn = document.createElement("button");
        
        tdT.textContent = book.title;
        tdA.textContent = book.author;
        tdI.textContent = book.isbn;

        editBtn.textContent = "Edit";
        editBtn.setAttribute("id", book._id);
        editBtn.addEventListener("click",actions["editBookGet"]);

        delBtn.textContent = "Delete";
        delBtn.id = book._id;
        delBtn.addEventListener("click",actions["delBook"]);

        tdBtn.append(editBtn,delBtn);
       
        tr.append(tdT,tdA,tdI,tdBtn);
        fragment.appendChild(tr);
    });
    container.appendChild(fragment);
        }catch(ex){
            alert(ex);
        }  
    },
    "createBook": async function(){
        const title = html.getBookTitle();
        const author = html.getBookAuthor();
        const isbn = html.getBookIsbn();
        if(title !== null && author !== null && isbn !== null){
            if(title.value !== "" && author.value !== "" && isbn.value !== ""){
                const data = {
                    title: title.value,
                    author: author.value,
                    isbn: isbn.value
                    };
                    try{
                        const response  = await post("appdata","books",data);
                        title.value = "";
                        author.value = "";
                        isbn.value = "";
                        actions["loadBooks"]();
                    }catch(ex){
                        alert(ex);
                    }
            }else{
                alert("There can not be empty fields");
                actions["loadBooks"]();
            }
        }
    },
    "editBookGet": async function(){
        const urlid = this.id;
        try{
            const book = await get("appdata",`books/${urlid}`);

            const id = html.getEditId();
            const title = html.getEditTitle();
            const author = html.getEditAuthor();
            const isbn = html.getEditIsbn();

            title.value = book.title;
            author.value = book.author;
            isbn.value = book.isbn;
            id.value = book._id;

        }catch(ex){
            alert(ex);
        }
    },
    "editBook": async function(){
            const id = html.getEditId();
            const title = html.getEditTitle();
            const author = html.getEditAuthor();
            const isbn = html.getEditIsbn();

            if(title !== null && author !== null && isbn !== null){
                if(title.value !== "" && author.value !== "" && isbn.value !== ""){
            const data = {
                title: title.value,
                author: author.value,
                isbn: isbn.value
            }
            try{
                const response = await put("appdata",`books/${id.value}`,data);
                id.value = "";
                title.value = "";
                author.value = "";
                isbn.value = "";
                actions["loadBooks"]();
            }catch(ex){
                alert(ex);
            }
        }else{
            alert("You cant change non-empty field to empty");
        }
    }
    },
    "delBook": async function(){
        if(confirm("Are you sure you want to delete this book?")){
            const id = this.id;
            try{
                const response = await del("appdata",`books/${id}`);
                actions["loadBooks"]();
            }catch(ex){
                alert(ex);
            }
        }
    },
}



function handleEvent(e){
    if(typeof actions[e.target.id] === "function"){
        e.preventDefault();
        actions[e.target.id]();
    }
}

(function attachEvent(){
    document.addEventListener("click" , handleEvent);
}())




