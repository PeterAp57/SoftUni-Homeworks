{npm i chai/mocha --save}
mocha tests -> bdd , ${file}
module.exports = BookStore;
const BookStore = require('./BookStore.js');
const  expect = require('chai').expect;
const  assert = require('chai').assert;

describe("BookStore",()=>{
    describe("Constructor Tests",()=>{
        it("Creation", ()=>{
        let x = new BookStore("Pesho");
        expect(x.name === "Pesho").to.be.true;
        })
        it("Constructor Test => expect [] from books", ()=>{
            let x = new BookStore("Pesho");
            expect(x.books.length === 0).to.be.true;
            })
            it("Constructor Test => expect [] from workers", ()=>{
                let x = new BookStore("Pesho");
                expect(x.workers.length === 0).to.be.true;
                })
                it("Creation", ()=>{
                    let x = new BookStore();
                    expect(x instanceof BookStore).to.be.true
                    })
    })
    describe("stockBooks() Tests",()=>{
        it("Does it push elements",()=>{
            let input = ["asd-asd"];
            let x = new BookStore("Pesho");
            x.stockBooks(input);
            expect(x.books.length === 1).to.true;
        })
        it("what it returns",()=>{
            let input = ["asd-asd"];;
            let x = new BookStore("Pesho");
           expect(x.stockBooks(input)).to.equal(x.books)
        })
        it("Does it push elements",()=>{
            let input = [];
            let x = new BookStore("Pesho");
            x.stockBooks(input);
            expect(x.books.length === 0).to.true;
        })
        it("Does it push elements",()=>{
            let input = ["asd-asd","dsa-dsa"];
            let x = new BookStore("Pesho");
            x.stockBooks(input);
            x.stockBooks(input);
            expect(x.books.length === 4).to.true;
        })
        it("Does it push elements",()=>{
            let input = ["asd-asd"];
            let x = new BookStore("Pesho");
            let y = x.stockBooks(input);
            expect(x.books === y).to.be.true;;
        })
    })
    describe("hire()  Tests",()=>{
        it("Does it add workers",()=>{
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            expect(x.workers.length === 1).to.true;
        })
        it("Does print message",()=>{
            let x = new BookStore("Pesho");
            expect(x.hire("Pesho","chistach")).to.equal(`Pesho started work at Pesho as chistach`);
        })
        it("Error test This person is our employee",()=>{
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            expect(()=> x.hire("Pesho","chistach")).to.Throw('This person is our employee');
        })

    })
    describe("fire()  Tests",()=>{
        it("Does it remove workers",()=>{
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            x.fire("Pesho");
            expect(x.workers.length === 0).to.true;
        })
        it("Does it remove workers",()=>{
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            expect(x.fire("Pesho")).to.equal("Pesho is fired");
        })
        it("Does it remove workers",()=>{
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            x.fire("Pesho")
            expect(()=> x.fire("Pesho")).to.Throw("Pesho doesn't work here");
        })
    })

    describe("sellBook() Tests",()=>{
        it("Does it sell",()=>{
            let input = ["asd-asd"];
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            x.stockBooks(input);
            x.sellBook("asd","Pesho");
            expect(x.books.length === 0).to.true;
        })
        it("Has pesho sold the book",()=>{
            let input = ["asd-asd"];
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            x.stockBooks(input);
            x.sellBook("asd","Pesho");
            let y = x.workers[0];
            expect(y.booksSold).to.equal(1);
        })
        it("throw This book is out of stock",()=>{
            let input = ["asd-asd"];
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            x.stockBooks(input);
            x.sellBook("asd","Pesho")
            expect(()=> x.sellBook("asd","Pesho")).to.Throw('This book is out of stock');
        })
        it("throw Pesho is not working here",()=>{
            let input = ["asd-asd"];
            let x = new BookStore("Pesho");
            x.stockBooks(input);
            expect(()=> x.sellBook("asd","Pesho")).to.Throw(`Pesho is not working here`);
        })

    })
    describe("print method tests",()=>{
        it("how it prints",()=>{
            let x = new BookStore("Pesho");
            x.hire("Pesho","chistach");
            let y = x.printWorkers();
            expect(y).to.equal(`Name:Pesho Position:chistach BooksSold:0`);
        })
    })
})