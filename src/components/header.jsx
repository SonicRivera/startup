export function Header() {
    return (
        <>
            <header>
                <script 
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
                    crossOrigin="anonymous">
                </script>
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-around">
                        <div className="col-2">
                            <h1><a href="index.html" className="text-decoration-none">MeltingPot</a></h1>
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
                            <button type="button" className="btn btn-primary">
                                Welcome <span id="username">Username</span>
                            </button>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                        <a className="navbar-brand ms-3" href="recipes.html">Recipes</a>
                        <a className="navbar-brand" href="submit-recipe.html">Submit a Recipe</a>
                        <a className="navbar-brand" href="about.html">About Us</a>
                        <a className="navbar-brand" href="login.html">Login</a>
                    </nav>
                </div>
            </header>
        </>
    );
}
