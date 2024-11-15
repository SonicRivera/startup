import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {

    const [quote, setQuote] = React.useState('Loading...');

    React.useEffect(() => {
        fetch('https://api.kanye.rest/')
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.quote);
            })
            .catch((error) => {
                console.error('Error fetching quote:', error);
                setQuote('Failed to load quote');
            });
    }, []);

    return (
        <>
            <div>
                <section>
                    <div className="container text-center">
                        <div className="row align-items-start my-4">
                            <h2>Featured Recipes</h2>
                            <hr />
                            <div className="col my-4">
                                <h3>
                                    <Link to="/mockrecipe" className="text-decoration-none">Spaghetti Carbonara</Link>
                                </h3>
                                <Link to="/mockrecipe">
                                    <img
                                        width="80%"
                                        src="https://images.pexels.com/photos/26597663/pexels-photo-26597663/free-photo-of-close-up-of-pasta-with-meat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Spaghetti Carbonara"
                                    />
                                </Link>
                                <p><span className="revstars">★★★★★</span></p>
                                <p>A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.</p>
                            </div>
                            <div className="col my-4">
                                <h3>
                                    <Link to="/mockrecipe" className="text-decoration-none">Chicken Tikka Masala</Link>
                                </h3>
                                <Link to="/mockrecipe">
                                    <img
                                        width="80%"
                                        src="https://images.pexels.com/photos/27287005/pexels-photo-27287005/free-photo-of-a-plate-of-food-with-rice-and-vegetables-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Chicken Tikka Masala"
                                    />
                                </Link>
                                <p><span className="revstars">★★★☆☆</span></p>
                                <p>Chunks of grilled chicken enveloped in a creamy, spiced tomato sauce.</p>
                            </div>
                            <div className="col my-4">
                                <h3>
                                    <Link to="/mockrecipe" className="text-decoration-none">Chow-mein Stir Fry</Link>
                                </h3>
                                <Link to="/mockrecipe">
                                    <img
                                        width="80%"
                                        src="https://images.pexels.com/photos/18698263/pexels-photo-18698263/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Chow-mein Stir Fry"
                                    />
                                </Link>
                                <p><span className="revstars">★★★★☆</span></p>
                                <p>A quick and easy dish packed with colorful vegetables and a savory sauce.</p>
                            </div>
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
            </div>
        </>
    );
}
