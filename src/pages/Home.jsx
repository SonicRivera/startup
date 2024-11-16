import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);

    useEffect(() => {
        const fetchFeaturedRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                const data = await response.json();
                // Assuming the first three recipes are featured
                setFeaturedRecipes(data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching featured recipes:', error);
            }
        };

        fetchFeaturedRecipes();
    }, []);

    return (
        <>
            <div>
                <section>
                    <div className="container text-center">
                        <div className="row align-items-start my-4">
                            <h2>Featured Recipes</h2>
                            <hr />
                            {featuredRecipes.map((recipe) => (
                                <div key={recipe.id} className="col my-4">
                                    <h3>
                                        <Link to={`/recipe/${recipe.id}`} className="text-decoration-none">{recipe.recipeName}</Link>
                                    </h3>
                                    <Link to={`/recipe/${recipe.id}`}>
                                        <img
                                            width="80%"
                                            src={recipe.image || "https://via.placeholder.com/150"}
                                            alt={recipe.recipeName}
                                        />
                                    </Link>
                                    <p><span className="revstars">{'★'.repeat(recipe.rating)}{'☆'.repeat(5 - recipe.rating)}</span></p>
                                    <p>{recipe.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container text-center my-5">
                        <h2>Submit Your Recipe</h2>
                        <p>Have a recipe you'd like to share? Click the button below to submit it!</p>
                        <Link to="/submit-recipe" className="btn btn-primary">
                            Submit Recipe
                        </Link>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row align-items-start my-5">
                            {/* Additional content can go here */}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;