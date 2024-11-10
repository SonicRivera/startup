import React from 'react';
import { Link } from 'react-router-dom';

export function Recipes() {
    return (
        <div>
            <section>
                <div className="container">
                    <h2>Browse by Category</h2>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#appetizers">Appetizers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#main-courses">Main Courses</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#desserts">Desserts</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>

            <main>
                <section className="container my-5">
                    <h2>Featured Recipe:</h2>
                    <div className="card mb-3 mx-auto" style={{ maxWidth: '800px' }}>
                        <div className="row g-0 align-items-center">
                            <div className="col-md-4">
                                <Link to="/mockrecipe">
                                    <img
                                        src="https://images.pexels.com/photos/5638539/pexels-photo-5638539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        className="img-fluid rounded-start"
                                        alt="Spaghetti Carbonara"
                                    />
                                </Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to="/mockrecipe">Garlic Tuscan Salmon</Link>
                                    </h5>
                                    <p className="card-text"><span className="revstars">★★★★☆</span></p>
                                    <p className="card-text">
                                        A rich and flavorful dish featuring pan-seared salmon topped with a creamy
                                        garlic sauce, sun-dried tomatoes, and spinach. Perfect for a cozy dinner!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container my-5">
                    <h1 className="text-center">Browse Recipes</h1>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <Link to="/mockrecipe">
                                    <img
                                        src="https://images.pexels.com/photos/5638539/pexels-photo-5638539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        className="card-img-top"
                                        alt="Garlic Tuscan Salmon"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to="/mockrecipe">Garlic Tuscan Salmon</Link>
                                    </h5>
                                    <p className="card-text">★★★★☆</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <Link to="/mockrecipe">
                                    <img
                                        src="https://images.pexels.com/photos/105588/pexels-photo-105588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        className="card-img-top"
                                        alt="Chicken and Rice"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to="/mockrecipe">Chicken and Rice</Link>
                                    </h5>
                                    <p className="card-text">★★☆☆☆</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <Link to="/mockrecipe">
                                    <img
                                        src="https://images.pexels.com/photos/8743914/pexels-photo-8743914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        className="card-img-top"
                                        alt="Sushi"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to="/mockrecipe">Sushi</Link>
                                    </h5>
                                    <p className="card-text">★★★★☆</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Recipes;
