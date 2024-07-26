# Installation Guide

## Overview

The Recipe App is a web application designed to help users discover and manage recipes based on their ingredients and preferences. Users can search for recipes, view their saved recipes, and manage various aspects of their recipe discovery experience.

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

The application uses Firebase for email and password authentication. This enables secure user registration and login. Ensure you set up Firebase configuration in the application with your own Firebase project settings.

### Context API

The application uses Context API to manage user authentication and recipe data. The UserContext provides global state management for user information and recipe handling.

# Setup and Installation

## Conditions

- **NPM** (installing)
- **IDE** (WebStorm)
- **Google Chrome/Edge**
- **Git**
- **Terminal**

## To set up the Recipe App, follow these steps:

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/haykdavidi/frontend-eindopdracht-novi-foody.git
    ```

2. **Open a new directory**:
    Navigate to the directory where you want to place the project.

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Start the development server**:
    ```sh
    npm run dev
    ```

