Food recept generator

# Installation Guide

## Overview

The Recipe App is a web application designed to help users discover and manage recipes based on their ingredients and preferences. Users can search for recipes, view their saved recipes, and manage various aspects of their recipe discovery experience. 

![Schermafbeelding 2024-10-09 192402](https://github.com/user-attachments/assets/79970dee-cd9c-4ef1-bd7e-336f78c3d4e6)

## Features

- **Search**: Find recipes based on ingredients and add filters to refine search results.
- **My Recipes**: View and manage a list of saved recipes.
- **Questionnaire**: Receive tailored recipe suggestions based on user responses.
- **Fridge**: Get recipe suggestions based on available ingredients.
- **Tempo**: Discover recipes based on the time available for cooking.
- **Authentication**: Users can log in or sign up to access and manage their recipes.

## Pages

### Home

The landing page of the application, featuring an introduction and navigation to other pages.

### Search

Allows users to search for recipes based on ingredients. Users can add and manage filters to refine their search.

### My Recipes

Displays a list of the user's saved recipes. Users can search through their saved recipes for easy access.

### Questionnaire

A page where users answer questions to get personalized recipe suggestions.

### Login

Provides functionality for users to log in or create a new account using Firebase email and password authentication.

### Fridge

Users enter ingredients they have to get recipe suggestions based on those ingredients.

### Tempo

Suggests recipes based on the amount of time the user has available for cooking.

## Components

### Navbar

A navigation bar that allows users to access different sections of the application.

### RecipeCard

A component displaying individual recipe details including name, ingredients, and a link to the full recipe.

### ResultsModal

A modal that presents search or questionnaire results to the user.

## APIs and Authentication

### Edamam API

The application uses the Edamam API to search for recipes based on provided ingredients and filters. The API requires an `app_id` and `app_key` which are included in the application's configuration files. For more information about the API and to obtain your own key, visit [Edamam API](https://developer.edamam.com/).

### Firebase Authentication

Firebase is used for secure email and password authentication. To set this up, you'll need to configure your Firebase project and update the project settings in the application with your Firebase API key and credentials.

### Context API

The application utilizes the Context API to manage global states such as user authentication and recipe data. UserContext handles user session information and recipes throughout the app. 

# Setup and Installation

## Conditions

- **Node.js: Install Node.js if not already installed. NPM (Node Package Manager) comes bundled with Node.js.** (installing)
- **IDE: It’s recommended to use an IDE such as WebStorm or VSCode for better project management.** (WebStorm)
- **Browser: Google Chrome or Microsoft Edge is recommended for testing and development.**
- **Git: Ensure Git is installed for version control.**
- **Terminal: Use a terminal or command prompt to run the necessary commands.**

## To set up the Recipe App, follow these steps:

1. **Clone the Repository**:
    ```sh
   https://github.com/haykdavidi/frontend-eindopdracht-novi-foody.git
     ```
![Schermafbeelding 2024-10-09 222218](https://github.com/user-attachments/assets/4cb13a3c-fbbb-4a31-9fb9-3ce791017c58)

2. **Open a new directory: Navigate to the directory where you want to place the project.**

![Schermafbeelding 2024-10-09 222626](https://github.com/user-attachments/assets/34181047-8a77-43b4-982b-a20a6a68e077)
   
3. **Navigate to the Project Directory**
   Change directory to the project folder:
    ```sh
   cd frontend-eindopdracht-novi-foody
     ```
4. **Create an Environment File (.env)**
   Create a .env file in the root directory of the project to securely store your API keys and other sensitive information. Add the following content:
    ```sh
   REACT_APP_API_KEY=your_api_key
     ```

5. **Install dependencies**:
    ```sh
    npm install
    ```

6. **Start the development server**:
    ```sh
    npm run dev
    ```
# Additional Commands

Here are some additional commands you may use:

## Build for Production
To create a production-ready version of the app, run:
```sh
    npm run build
  ```
This will generate optimized static files in the build/ directory.

## Run Tests
If there are any unit or integration tests, you can run them using:
```sh
    npm test
  ```
## Lint the code
Ensure your code follows proper formatting and style with:
```sh
    npm run lint
  ```
# MIT License
This project is licensed under the MIT License. See the LICENSE file for more details.



