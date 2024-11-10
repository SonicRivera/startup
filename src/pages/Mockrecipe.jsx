import React from 'react';
import { Reviews } from '../components/Reviews';

export function MockRecipe() {
    return (
        <main>
            <section className="container">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4 d-flex align-items-center">
                            <img 
                                src="https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg" 
                                className="img-fluid rounded-start" 
                                alt="Spaghetti Carbonara"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title">Spaghetti Carbonara Recipe</h1>
                                <p><span className="revstars">★★★★★</span></p>
                                <h2 className="card-subtitle mb-3">Ingredients</h2>
                                <ul>
                                    <li>200g Spaghetti</li>
                                    <li>100g Pancetta or Bacon</li>
                                    <li>2 Large Eggs</li>
                                    <li>50g Pecorino Cheese</li>
                                    <li>50g Parmesan Cheese</li>
                                    <li>2 Garlic Cloves (optional)</li>
                                    <li>Freshly Ground Black Pepper</li>
                                    <li>Salt</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Instructions</h2>
                <ol>
                    <li>Boil the spaghetti in salted water according to the package instructions.</li>
                    <li>Fry the pancetta or bacon until crispy. Set aside.</li>
                    <li>In a bowl, whisk together the eggs and grated cheeses (Pecorino and Parmesan).</li>
                    <li>If using, lightly fry the garlic cloves in the bacon fat, then discard.</li>
                    <li>Drain the spaghetti, reserving a little cooking water.</li>
                    <li>Toss the spaghetti with the pancetta and garlic (if used).</li>
                    <li>Off the heat, mix in the egg and cheese mixture, stirring quickly.</li>
                    <li>Add a splash of the reserved cooking water to loosen the sauce if needed.</li>
                    <li>Season with freshly ground black pepper and serve immediately.</li>
                </ol>
            </section>

            <Reviews />
        </main>
    );
}

