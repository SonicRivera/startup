const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
let usersCollection;

async function main(){
  await client.connect();
  const db = client.db('meltingDB');
  usersCollection = db. collection('users');

}
main().catch(console.error);

// Store recipes
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

// CORS configuration
const corsOptions = {
  origin: 'https://startup.meltingpot.live',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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
apiRouter.post('/recipes/:id/reviews', (req, res) => {
  const { rating, text, author } = req.body;
  const recipe = recipes.find(r => r.id === req.params.id);

  if (recipe) {
    const review = { rating: parseInt(rating), text, author };
    recipe.reviews.push(review);

    // Calculate the new average rating
    const totalRating = recipe.reviews.reduce((sum, review) => sum + review.rating, 0);
    recipe.rating = Math.round(totalRating / recipe.reviews.length);

    res.status(201).json(review);
  } else {
    res.status(404).send({ msg: 'Recipe not found' });
  }
});

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await usersCollection.findOne({ username });

  if (existingUser) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const user = { username, password, token: uuid.v4() };
  await usersCollection.insertOne(user);
  res.status(201).send({ token: user.token });
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await usersCollection.findOne({ username });

  if (user && user.password === password) {
    const token = uuid.v4();
    await usersCollection.updateOne({ username }, { $set: { token } });
    res.send({ token });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

// Logout a user
apiRouter.post('/auth/logout', async (req, res) => {
  const { token } = req.body;
  const result = await usersCollection.updateOne({ token }, { $unset: { token: "" } });

  if (result.modifiedCount > 0) {
    res.status(204).end();
  } else {
    res.status(401).send({ msg: 'Invalid token' });
  }
});

// Get user data
apiRouter.get('/auth/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = await usersCollection.findOne({ token });

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Invalid token' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});