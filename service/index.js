const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const DB = require('./database.js');
const config = require('./dbConfig.json');


const JWT_SECRET = config.JWT_SECRET;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://startup.meltingpot.live'
    : 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server attached to HTTP server
const wss = new WebSocket.Server({ 
  server,
  path: '/ws'
});

// WebSocket connection handler
wss.on('connection', socket => {
  socket.on('message', async (message) => {
    try {
      const messageData = JSON.parse(message);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageData));
        }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
});

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

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

// Search Recipes
apiRouter.get('/recipes/search', async (req, res) => {
  const searchQuery = req.query.q?.toLowerCase();
  if (!searchQuery) {
    return res.json([]);
  }

  try {
    const recipes = await DB.getRecipes();
    const filteredRecipes = recipes.filter(recipe => 
      recipe.recipeName.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.toLowerCase().includes(searchQuery) ||
      recipe.category.toLowerCase().includes(searchQuery)
    );
    res.json(filteredRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search recipes' });
  }
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

// Update the listen call to use the HTTP server
const port = process.argv.length > 2 ? process.argv[2] : 4000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});