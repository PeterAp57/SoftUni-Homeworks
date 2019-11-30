class Library{

constructor(libraryName){
    this.libraryName = libraryName;
    this.subscribers = [];
    this.subscriptionTypes = {
        normal: Number(this.libraryName.length),
        special: Number(this.libraryName.length)*2,
        vip: Number.MAX_SAFE_INTEGER
    };
}

subscribe(name,type){
    if(!this.subscriptionTypes[type]){
        throw new Error(`The type ${type} is invalid`);
    }
    if(this.subscribers.find(e => e.name === name)){
        this.subscribers[this.subscribers.findIndex(e => e.name === name)].type = type;
    }else{
        this.subscribers.push({
            name: name,
            type: type,
            books: []
        });
    }
    return this.subscribers[this.subscribers.findIndex(e => e.name === name)];
}

unsubscribe(name){
    let i = this.subscribers.findIndex(e => e.name === name);
    if(i === -1){
        throw new Error(`There is no such subscriber as ${name}`);
    }
    this.subscribers.splice(i,1);
    return this.subscribers;
}

receiveBook(name,bookTitle, bookAuthor){
    let sub = this.subscribers.find(e => e.name === name);
    if(!sub){
        throw new Error(`There is no such subscriber as ${name}`);
    }
    if(sub.books.length >= this.subscriptionTypes[sub.type]){
            throw new Error(`You have reached your subscription limit ${this.subscriptionTypes[sub.type]}!`);
        }
        sub.books.push({
            title: bookTitle,
            author: bookAuthor
        })
    
    return sub;
}

showInfo (){
    if(!this.subscribers.length){
        return `${this.libraryName} has no information about any subscribers`;
    }
       return this.subscribers.map(s=>{
            const output = s.books.map(b=> `${b.title} by ${b.author}`)
            .join(", ");
            return `Subscriber: ${s.name}, Type: ${s.type}\nReceived books: ${output}`;
        }).join("\n")
    }
}

let lib = new Library('Lib');

lib.subscribe('Peter', 'normal');
lib.subscribe('John', 'special');

lib.receiveBook('John', 'A Song of Ice and Fire', 'George R. R. Martin');
lib.receiveBook('Peter', 'Lord of the rings', 'J. R. R. Tolkien');
lib.receiveBook('John', 'Harry Potter', 'J. K. Rowling');

console.log(lib.showInfo());


