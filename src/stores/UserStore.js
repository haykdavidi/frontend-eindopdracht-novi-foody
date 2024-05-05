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

    async login(email, password) {
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://api.datavortex.nl/moodfood/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'moodfood:1eWXiJ7AnZPPemeiGYY0'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const token = await response.json();
                localStorage.setItem('token', token); // Save token to local storage
                this.authenticated = true;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async register(email, password) {
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://api.datavortex.nl/moodfood/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'moodfood:1eWXiJ7AnZPPemeiGYY0'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // If registration is successful, you might want to log in the user automatically
                await this.login(email, password);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
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
