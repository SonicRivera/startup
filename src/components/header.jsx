import React from "react";
import { Link } from 'react-router-dom';

export function Header({ username }) {


    return (
        <header>
            <div className="container-fluid">
                <div className="row align-items-center justify-content-around">
                    <div className="col-2">
                        <h1>
                            <Link to="/" className="text-decoration-none">MeltingPot</Link>
                        </h1>
                    </div>
                    <div className="col-3">
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search Recipes"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-2">
                    <Link to="/login" className="btn btn-primary">
                            Welcome <span id="username">{username}</span>
                        </Link>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                    <Link className="navbar-brand ms-3" to="/recipes">Recipes</Link>
                    <Link className="navbar-brand" to="/submit-recipe">Submit a Recipe</Link>
                    <Link className="navbar-brand" to="/about">About Us</Link>
                    <Link className="navbar-brand" to="/login">Login</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
