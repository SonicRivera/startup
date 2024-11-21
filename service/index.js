const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database.js');
const config = require('./dbConfig.json');

const JWT_SECRET = config.JWT_SECRET;
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173/', // use when not developing https://startup.meltingpot.live/
  optionsSuccessStatus: 200,
  credentials: true // Allow credentials (cookies) to be sent

};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

let recipes = [{
  id: uuid.v4(),
  recipeName: "Garlic Tuscan Salmon",
  ingredients: "Salmon, garlic, sun-dried tomatoes, spinach",
  instructions: "Pan-sear salmon and top with creamy garlic sauce.",
  prepTime: "10 mins",
  cookTime: "20 mins",
  servings: 4,
  category: "Main Course",
  rating: 4,
  image: "https://images.pexels.com/photos/5638539/pexels-photo-5638539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  reviews: [
    { rating: 5, text: "Absolutely delicious! The sauce was heavenly.", author: "Sarah L." },
    { rating: 4, text: "Quick and easy to make. Perfect for weeknight dinners.", author: "James R." },
    { rating: 5, text: "Good balance between pasta and meat, very delicious!", author: "Lauren R." }
  ]
},
{
  id: uuid.v4(),
  recipeName: "Chicken Tikka Masala",
  ingredients: "Chicken, Tikka, Masala",
  instructions: "Cook it.",
  prepTime: "15 mins",
  cookTime: "15 mins",
  servings: 4,
  category: "Main Course",
  rating: 5,
  image: "https://images.pexels.com/photos/27287005/pexels-photo-27287005/free-photo-of-a-plate-of-food-with-rice-and-vegetables-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  reviews: [
    { rating: 5, text: "The best Chicken Tikka Masala I've ever had!", author: "Emily K." },
    { rating: 4, text: "Very flavorful and easy to make.", author: "Michael B." },
    { rating: 5, text: "My family loved it. Will make again!", author: "Jessica T." }
  ]
},
{
  id: uuid.v4(),
  recipeName: "Chow-mein Stir Fry",
  ingredients: "Chow mein, Stir, Fry",
  instructions: "Cook it.",
  prepTime: "30 mins",
  cookTime: "15 mins",
  servings: 2,
  category: "Main Course",
  rating: 4,
  image: "https://images.pexels.com/photos/18698263/pexels-photo-18698263/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  reviews: [
    { rating: 4, text: "Great flavors and easy to make.", author: "David P." },
    { rating: 3, text: "Good, but could use more seasoning.", author: "Anna W." },
    { rating: 4, text: "Quick and tasty meal.", author: "Chris M." }
  ]
},
{
  id: uuid.v4(),
  recipeName: "Spaghetti Carbonara",
  ingredients: "Spaghetti, carbonara",
  instructions: "Cook it.",
  prepTime: "35 mins",
  cookTime: "10 mins",
  servings: 8,
  category: "Main Course",
  rating: 5,
  image: "https://images.pexels.com/photos/26597663/pexels-photo-26597663/free-photo-of-close-up-of-pasta-with-meat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  reviews: [
    { rating: 5, text: "Classic and delicious. Perfectly creamy.", author: "Sophia L." },
    { rating: 4, text: "Easy to make and very tasty.", author: "Daniel G." },
    { rating: 5, text: "A family favorite. Will make again!", author: "Olivia H." }
  ]
}];

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await DB.getUser(username);

  if (existingUser) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  await DB.insertUser(user);
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).status(201).send({ token });
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await DB.getUser(username);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).send({ token });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

// Logout a user
apiRouter.post('/auth/logout', (req, res) => {
  res.clearCookie('token').status(204).end();
});

// Get user data
apiRouter.get('/auth/me', authenticateToken, async (req, res) => {
  const user = await DB.getUser(req.user.username);

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Invalid token' });
  }
});

// New Recipe
apiRouter.post('/newrecipe', authenticateToken, async (req, res) => {
  const { recipeName, ingredients, instructions, prepTime, cookTime, servings, category, image } = req.body;

  if (!recipeName || !ingredients || !instructions || !prepTime || !cookTime || !servings || !category) {
    return res.status(400).send({ msg: 'All fields are required' });
  }

  const recipe = { id: uuid.v4(), recipeName, ingredients, instructions, prepTime, cookTime, servings, category, image, reviews: [] };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// Get Recipes
apiRouter.get('/recipes', (req, res) => {
  res.json(recipes);
});

// Get a specific recipe by ID
apiRouter.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send({ msg: 'Recipe not found' });
  }
});

// Add a review to a recipe
apiRouter.post('/recipes/:id/reviews', authenticateToken, (req, res) => {
  const { rating, text } = req.body;
  const recipe = recipes.find(r => r.id === req.params.id);

  if (recipe) {
    const review = { rating: parseInt(rating), text, author: req.user.username };
    recipe.reviews.push(review);

    // Calculate the new average rating
    const totalRating = recipe.reviews.reduce((sum, review) => sum + review.rating, 0);
    recipe.rating = Math.round(totalRating / recipe.reviews.length);

    res.status(201).json(review);
  } else {
    res.status(404).send({ msg: 'Recipe not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});