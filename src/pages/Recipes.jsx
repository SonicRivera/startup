import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../components/RecipeProvider';

export function Recipes() {
    const { recipes } = useRecipes();

    return (
        <div>
            <section className="container my-5">
                <h1 className="text-center">Browse Recipes</h1>
                <div className="row">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <Link to={`/mockrecipe`}>
                                    <img
                                        src={recipe.image || "https://via.placeholder.com/150"}
                                        className="card-img-top"
                                        alt={recipe.name}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to={`/mockrecipe`}>
                                            {recipe.name}
                                        </Link>
                                    </h5>
                                    <p className="card-text">Rating: {recipe.rating} ★</p>
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
