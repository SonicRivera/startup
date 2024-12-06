const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database.js');
const config = require('./dbConfig.json');
const WebSocket = require('ws')
const server = new WebSocket.Server({port: '5000'})

const JWT_SECRET = config.JWT_SECRET;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173/', // Switch to 'https://startup.meltingpot.live/' for production
  optionsSuccessStatus: 200,
  credentials: true

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
  await DB.insertRecipe(recipe);
  res.status(201).json(recipe);
});

// Get Recipes
apiRouter.get('/recipes', async (req, res) => {
  const recipes = await DB.getRecipes();
  res.json(recipes);
});

// Get a specific recipe by ID
apiRouter.get('/recipes/:id', async (req, res) => {
  const recipe = await DB.getRecipeById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send({ msg: 'Recipe not found' });
  }
});

// Add a review to a recipe
apiRouter.post('/recipes/:id/reviews', authenticateToken, async (req, res) => {
  const { rating, text } = req.body;
  const recipe = await DB.getRecipeById(req.params.id);

  if (recipe) {
    const review = { rating: parseInt(rating), text, author: req.user.username };
    recipe.reviews.push(review);

    // Calculate the new average rating
    const totalRating = recipe.reviews.reduce((sum, review) => sum + review.rating, 0);
    recipe.rating = Math.round(totalRating / recipe.reviews.length);

    await DB.updateRecipe(req.params.id, recipe);
    res.status(201).json(review);
  } else {
    res.status(404).send({ msg: 'Recipe not found' });
  }
});

server.on('connection', socket => {
  socket.on('message', message => {
    // Broadcast the message to all connected clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Pass through the complete message with username
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});