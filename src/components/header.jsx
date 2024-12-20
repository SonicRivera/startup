import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Header({ username }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    navigate('/');
    location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Recipes"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </div>
          <div className="col-2">
            {username ? (
              <>
                <span>Welcome, {username}</span>
                <button onClick={handleLogout} className="btn btn-secondary ms-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </>
            )}
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
          <Link className="navbar-brand ms-3" to="/recipes">Recipes</Link>
          <Link className="navbar-brand" to="/submit-recipe">Submit a Recipe</Link>
          <Link className="navbar-brand" to="/about">About Us</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;