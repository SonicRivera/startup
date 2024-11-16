import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from '../components/Reviews';

export function MockRecipe({ username }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`);
                const data = await response.json();
                setRecipe(data);
                setAverageRating(data.rating);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const renderStars = (rating) => {
        if (isNaN(rating) || rating < 0) {
            rating = 0;
        } else if (rating > 5) {
            rating = 5;
        }
        return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <section className="container">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4 d-flex align-items-center">
                            <img 
                                src={recipe.image} 
                                className="img-fluid rounded-start" 
                                alt={recipe.recipeName}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title">{recipe.recipeName}</h1>
                                <p><span className="revstars">{renderStars(averageRating)}</span></p>
                                <h2 className="card-subtitle mb-3">Ingredients</h2>
                                <ul>
                                    {recipe.ingredients.split(',').map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <h2 className="card-subtitle mb-3">Instructions</h2>
                                <p>{recipe.instructions}</p>
                                <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
                                <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
                                <p><strong>Servings:</strong> {recipe.servings}</p>
                                <p><strong>Category:</strong> {recipe.category}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Reviews reviews={recipe.reviews} setAverageRating={setAverageRating} username={username} recipeId={id} />
            </section>
        </main>
    );
}

export default MockRecipe;