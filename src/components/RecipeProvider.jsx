import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([
        {
            name: "Garlic Tuscan Salmon",
            ingredients: "Salmon, garlic, sun-dried tomatoes, spinach",
            instructions: "Pan-sear salmon and top with creamy garlic sauce.",
            prepTime: "10 mins",
            cookTime: "20 mins",
            servings: 4,
            category: "Main Course",
            rating: 4,
            image: "https://images.pexels.com/photos/5638539/pexels-photo-5638539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Chicken Tikka Masala",
            ingredients: "Chicken, Tikka, Masala",
            instructions: "Cook it.",
            prepTime: "15 mins",
            cookTime: "15 mins",
            servings: 4,
            category: "Main Course",
            rating: 3,
            image: "https://images.pexels.com/photos/27287005/pexels-photo-27287005/free-photo-of-a-plate-of-food-with-rice-and-vegetables-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Chow-mein Stir Fry",
            ingredients: "Chow mein, Stir, Fry",
            instructions: "Cook it.",
            prepTime: "30 mins",
            cookTime: "15 mins",
            servings: 2,
            category: "Main Course",
            rating: 4,
            image: "https://images.pexels.com/photos/18698263/pexels-photo-18698263/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Spaghetti Carbonara",
            ingredients: "Spaghetti, carbonara",
            instructions: "Cook it.",
            prepTime: "35 mins",
            cookTime: "10 mins",
            servings: 8,
            category: "Main Course",
            rating: 5,
            image: "https://images.pexels.com/photos/26597663/pexels-photo-26597663/free-photo-of-close-up-of-pasta-with-meat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
    ]);

    const addRecipe = (recipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, recipe]);
    };

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => useContext(RecipeContext);
