import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../components/RecipeProvider';

export function SubmitRecipe() {
    const navigate = useNavigate();
    const { addRecipe } = useRecipes();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecipe({
            name: formData.recipeName,
            ingredients: formData.ingredients,
            instructions: formData.instructions,
            prepTime: formData.prepTime,
            cookTime: formData.cookTime,
            servings: formData.servings,
            category: formData.category,
            image: formData.image,
            rating: 0
        });
        navigate('/recipes'); // Navigate to the recipes page after submission
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

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit Recipe</button>
                </form>
            </div>
        </main>
    );
}

export default SubmitRecipe;
