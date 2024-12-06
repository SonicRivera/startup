import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chatbox } from '../components/Chatbox';

export function Home() {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const [quote, setQuote] = React.useState('Loading...');
    let beg;
    let end;

    useEffect(() => {

        const fetchFeaturedRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                const data = await response.json();
                if (data.length > 2){
                    beg = data.length - 3;
                    end = data.length;
                    setFeaturedRecipes(data.slice(beg, end));
                    
                } else {
                    setFeaturedRecipes(data.slice(0, 3));
                }
                // Assuming the first three recipes are featured
            } catch (error) {
                console.error('Error fetching featured recipes:', error);
            }
        };

        fetch('https://api.kanye.rest/')
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.quote);
            })
            .catch((error) => {
                console.error('Error fetching quote:', error);
                setQuote('Failed to load quote');
            });

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
                            <div className="col">
                                <h2>About Us</h2>
                                <p>
                                    Learn about this project at my <a href="https://github.com/SonicRivera/startup" className="text-decoration-none" target="_blank" rel="noopener noreferrer">GitHub page!</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container text-center my-5">
                        <h3>Kanye Quote:</h3>
                        <p className='quote'>"{quote}"</p>
                        <p className='author'>- Kanye West</p>
                    </div>
                </section>
                <section>
                    <div className="container my-5">
                        <h3 className="text-center mb-4">Chat</h3>
                        <Chatbox />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;