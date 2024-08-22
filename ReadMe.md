# Installatiehandleiding

## 1. Inleiding

Soms ontbreekt het ons aan creatieve inspiratie om een maaltijd te bedenken. Het dagelijks nadenken over wat er vanavond gekookt moet worden kan vermoeiend zijn. Om dit op te lossen, ga ik een applicatie bouwen waarbij door middel van leuke vragen over je stemming, gezelschap en motivatie een maaltijd wordt samengesteld. Je krijgt direct leuke receptsuggesties nadat we je mood hebben gepeild.

## 2. Voorwaarden/Benodigdheden

NPM (installeren)
IDE (Webstorm)
Google Chrome/Edge
Git
Terminal

## 3. Installatie

1. Kopier het project : https://github.com/haykdavidi/frontend-eindopdracht-novi-foody.git
2. Open een nieuwe directory
3. voer in npm install
4. voer in npm run dev 

Lets find your MoodFood! 

# Recipe App

## Overview

The Recipe App is a web application designed to help users discover and manage recipes based on their ingredients and preferences. Users can search for recipes, view their saved recipes, and manage various aspects of their recipe discovery experience.

## Features

- **Search**: Find recipes based on ingredients and add filters to refine search results.
- **My Recipes**: View and manage a list of saved recipes.
- **Decide your MoodFood**: Receive tailored recipe suggestions based on user responses.
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

### Decide your MoodFood

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

A modal that presents search or Decide your MoodFood results to the user.

## APIs and Authentication

### Edamam API

The application uses the Edamam API to search for recipes based on provided ingredients and filters. The API requires an `app_id` and `app_key` which are included in the application's configuration files. For more information about the API and to obtain your own key, visit [Edamam API](https://developer.edamam.com/).

### Firebase Authentication

The application uses Firebase for email and password authentication. This enables secure user registration and login. Ensure you set up Firebase configuration in the application with your own Firebase project settings.

### Context API

The application uses Context API to manage user authentication and recipe data. The UserContext provides global state management for user information and recipe handling.


## Setup and Installation

To set up the Recipe App, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd recipe-app
   npm install
   npm run dev