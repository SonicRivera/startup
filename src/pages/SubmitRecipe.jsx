import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SubmitRecipe() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        recipeName: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        servings: 1,
        category: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch a random image from the Foodish API
            const imageResponse = await fetch('https://foodish-api.com/api');
            const imageData = await imageResponse.json();
            const imageUrl = imageData.image;

            const recipeData = {
                recipeName: formData.recipeName,
                ingredients: formData.ingredients,
                instructions: formData.instructions,
                prepTime: formData.prepTime,
                cookTime: formData.cookTime,
                servings: formData.servings,
                category: formData.category,
                image: imageUrl, // Use the random image URL
            };

            const response = await fetch('/api/newrecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                navigate('/recipes'); // Navigate to the recipes page after submission
            } else {
                console.error('Failed to submit recipe');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="container">
            <div className="row mt-3">
                <h3>Submit a Recipe</h3>
            </div>
            <div className="row">
                <form onSubmit={handleSubmit} className="container mt-4">
                    <div className="mb-3">
                        <label htmlFor="recipe-name" className="form-label">Recipe Name:</label>
                        <input
                            type="text"
                            id="recipe-name"
                            name="recipeName"
                            className="form-control"
                            value={formData.recipeName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ingredients" className="form-label">Ingredients:</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            className="form-control"
                            rows="5"
                            value={formData.ingredients}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="instructions" className="form-label">Instructions:</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            className="form-control"
                            rows="5"
                            value={formData.instructions}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="prep-time" className="form-label">Prep Time:</label>
                            <input
                                type="text"
                                id="prep-time"
                                name="prepTime"
                                className="form-control"
                                value={formData.prepTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="cook-time" className="form-label">Cook Time:</label>
                            <input
                                type="text"
                                id="cook-time"
                                name="cookTime"
                                className="form-control"
                                value={formData.cookTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="servings" className="form-label">Servings:</label>
                            <input
                                type="number"
                                id="servings"
                                name="servings"
                                className="form-control"
                                min="1"
                                value={formData.servings}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="category" className="form-label">Category:</label>
                            <select
                                id="category"
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="appetizer">Appetizer</option>
                                <option value="main-course">Main Course</option>
                                <option value="dessert">Dessert</option>
                                <option value="healthy">Healthy</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit Recipe</button>
                </form>
            </div>
        </main>
    );
}

export default SubmitRecipe;