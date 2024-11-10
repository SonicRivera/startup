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
        }
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
