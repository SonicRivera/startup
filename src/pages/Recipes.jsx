import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <section className="container my-5">
                <h1 className="text-center">Browse Recipes</h1>
                <div className="row">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <Link to={`/recipe/${recipe.id}`}>
                                    <img
                                        src={recipe.image || "https://via.placeholder.com/150"}
                                        className="card-img-top"
                                        alt={recipe.recipeName}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to={`/recipe/${recipe.id}`}>
                                            {recipe.recipeName}
                                        </Link>
                                    </h5>
                                    <p className="card-text">Rating: {recipe.rating || 0} ★</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Recipes;