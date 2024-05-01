import {makeAutoObservable} from "mobx";

export class UserStore {
    email = "";
    password = "";
    authenticated = false;
    recipes = [];

    constructor() {
        makeAutoObservable(this);
        this.initRecipes();
    }

    login(email, password) {
        const data = {
            email: email,
            password: password
        };

        // TODO: Request naar back-end hier implementeren
    }

    register(email, password) {
        const data = {
            email: email,
            password: password
        };

        // TODO: Request naar back-end hier implementeren
    }

    initRecipes() {
        this.recipes = this.getRecipes();
    }

    addRecipe(recipe) {

        if (!this.recipes.find(r => r.label === recipe.label)) {
            this.recipes.push(recipe);
        }

        localStorage.setItem("savedRecipes", JSON.stringify(this.recipes));
    }

    removeRecipe(recipe) {
        this.recipes = this.recipes.filter(r => r.label !== recipe.label);
        localStorage.setItem("savedRecipes", JSON.stringify(this.recipes));
    }

    containsRecipe(recipe) {
        return this.recipes.find(r => r.label === recipe.label);
    }

    getRecipes() {
        return JSON.parse(localStorage.getItem('savedRecipes')) || [];
    }
}