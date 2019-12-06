import { getPartials, setHeaderInfo } from "./shared.js";
import { get, post, put, del } from "../requester.js";

export function getRecipes(context) {
    setHeaderInfo(context);
    this.loadPartials(getPartials())
        .partial("./templates/recepies/share.hbs")
};

export function postRecipes(context) {
    const { meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;
    const categories = {
        "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
        "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
        "Milk, chees, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
        "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg",
        "Vegetables and legumes/beans": "https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg"
    };

    if (meal && ingredients && prepMethod && description && foodImageURL && category) {
        post("appdata", "recipes", {
            meal,
            ingredients: ingredients.split(" "),
            prepMethod,
            description,
            foodImageURL,
            category,
            likesCounter: 0,
            categoryImageURL: categories[category]
        })
            .then(() => {
                context.redirect("/")
            })
            .catch(console.error);
    }

};

export function recepeInfo(context) {
    const id = context.params.id;
    setHeaderInfo(context);
    get("appdata", `recipes/${id}`, "Kinvey")
        .then(r => {
            r.isCreator = sessionStorage.getItem("userId") === r._acl.creator;
            context.recipe = r;
            this.loadPartials(getPartials())
                .partial("../templates/recepies/info.hbs")
        })
        .catch(console.error);
};

export function edit(context) {
    const id = context.params.id;
    setHeaderInfo(context);
    get("appdata", `recipes/${id}`, "Kinvey")
        .then(r => {
            r.ingredients = r.ingredients.join(" ");
            context.recipe = r;
            this.loadPartials(getPartials())
                .partial("../templates/recepies/edit.hbs")
        })
        .catch(console.error);
}

export function editPost(context) {
    const { meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;
    const categories = {
        "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
        "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
        "Milk, chees, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
        "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg",
        "Vegetables and legumes/beans": "https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg"
    };
    const id = context.params.id;
    get("appdata", `recipes/${id}`, "Kinvey")
        .then(r => {
            put("appdata", `recipes/${id}`, {
                meal,
                prepMethod,
                description,
                foodImageURL,
                "ingredients": ingredients.split(", "),
                category,
                categoryImageURL: categories[category],
            }, "Kinvey")
                .then(() => {
                    context.redirect(`/recipes/${id}`);
                });
        }).catch(console.error);

}

export function dele(context) {
    const id = context.params.id;
    del("appdata", `recipes/${id}`, "Kinvey")
        .then(() => {
            context.redirect("/");
        })
}

export function like(context) {
    alert("You liked that recipe");
    const id = ctx.params.id;

    get("appdata", `recipes/${id}`, "Kinvey")
        .then(r => {
            r.likesCounter++;
            put("appdata", `recipes/${id}`, r, "Kinvey")
                .then(() => {
                    context.redirect(`/recipes/$id}`);
                }).catch(console.error);
        }).catch(console.error);
};