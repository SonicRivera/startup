const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const app = express();

// Store users and recipes
let users = {};
let recipes = [{
  recipeName: "Garlic Tuscan Salmon",
  ingredients: "Salmon, garlic, sun-dried tomatoes, spinach",
  instructions: "Pan-sear salmon and top with creamy garlic sauce.",
  prepTime: "10 mins",
  cookTime: "20 mins",
  servings: 4,
  category: "Main Course",
  rating: 4,
  image: "https://images.pexels.com/photos/5638539/pexels-photo-5638539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
},
{
  recipeName: "Chicken Tikka Masala",
  ingredients: "Chicken, Tikka, Masala",
  instructions: "Cook it.",
  prepTime: "15 mins",
  cookTime: "15 mins",
  servings: 4,
  category: "Main Course",
  rating: 5,
  image: "https://images.pexels.com/photos/27287005/pexels-photo-27287005/free-photo-of-a-plate-of-food-with-rice-and-vegetables-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
},
{
  recipeName: "Chow-mein Stir Fry",
  ingredients: "Chow mein, Stir, Fry",
  instructions: "Cook it.",
  prepTime: "30 mins",
  cookTime: "15 mins",
  servings: 2,
  category: "Main Course",
  rating: 4,
  image: "https://images.pexels.com/photos/18698263/pexels-photo-18698263/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
},
{
  recipeName: "Spaghetti Carbonara",
  ingredients: "Spaghetti, carbonara",
  instructions: "Cook it.",
  prepTime: "35 mins",
  cookTime: "10 mins",
  servings: 8,
  category: "Main Course",
  rating: 5,
  image: "https://images.pexels.com/photos/26597663/pexels-photo-26597663/free-photo-of-close-up-of-pasta-with-meat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
}];

app.use(cors());
app.use(express.json());
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

// New Recipe
apiRouter.post('/newrecipe', async (req, res) => {
  const { recipeName, ingredients, instructions, prepTime, cookTime, servings, category, image } = req.body;

  if (!recipeName || !ingredients || !instructions || !prepTime || !cookTime || !servings || !category) {
    return res.status(400).send({ msg: 'All fields are required' });
  }

  const recipe = { id: uuid.v4(), recipeName, ingredients, instructions, prepTime, cookTime, servings, category, image };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// Get Recipes
apiRouter.get('/recipes', (req, res) => {
  res.json(recipes);
});

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const user = { username, password, token: uuid.v4() };
  users[username] = user;
  res.status(201).send({ token: user.token });
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    user.token = uuid.v4();
    res.send({ token: user.token });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

// Logout a user
apiRouter.post('/auth/logout', (req, res) => {
  const { token } = req.body;
  const user = Object.values(users).find(u => u.token === token);

  if (user) {
    delete user.token;
    res.status(204).end();
  } else {
    res.status(401).send({ msg: 'Invalid token' });
  }
});

// Get user data
apiRouter.get('/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = Object.values(users).find(u => u.token === token);

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});