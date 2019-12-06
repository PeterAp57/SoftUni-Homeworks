import * as auth from "./handlers/auth.js";
import * as recep from "./handlers/recep.js";
import * as shared from "./handlers/shared.js";
import { get, post, put, del } from "./requester.js";

(() => {

    const app = Sammy("#rooter", function () {
        this.use("Handlebars", "hbs");

        this.get("/", function (context) {
            shared.setHeaderInfo(context);
            if (context.isLogged) {
                get("appdata", "recipes", "Kinvey")
                    .then(r => {
                        context.recipes = r;
                        this.loadPartials(shared.getPartials())
                            .partial("./templates/home.hbs");
                    })
            } else {
                this.loadPartials(shared.getPartials())
                    .partial("./templates/home.hbs");
            }
        });

        this.get("/register", auth.getRegister);

        this.post("/register", auth.postRegister);

        this.get("/login", auth.getLogin);

        this.post("/login", auth.postLogin);

        this.get("/logout", auth.logout);

        this.get("/share", recep.getRecipes);

        this.post("/share", recep.postRecipes);

        this.get("/recipe/:id", recep.recepeInfo);

        this.get("/edit/:id", recep.edit);

        this.post("/edit/:id", function(context){
            const { meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;
            const categories = {
                "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
                "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
                "Milk, chees, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
                "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg",
                "Vegetables and legumes/beans": "https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg"
            };
            const id = context.params.id;
            
                put("appdata", `recipes/${id}`, {
                    meal,
                    ingredients: ingredients.split(" "),
                    prepMethod,
                    description,
                    foodImageURL,
                    category,
                    categoryImageURL: categories[category]
                })
                    .then(() => {
                        context.redirect("/");
                    })
                    .catch(ex =>{
                        alert(ex);
                    });
        });

        this.get("archive", recep.dele);

        this.get("/likes/:id", recep.like);

    });

    app.run();

})()