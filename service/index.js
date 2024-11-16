const express = require('express');
const uuid = require('uuid');
const app = express();

// Store users and recipes
let users = {};
let recipes = [];

apiRouter.post('/auth/newrecipe', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const recipe = { recipeName, ingredients, instructions, prepTime, cookTime, servings, category, image };
  recipes.push(recipe);
  res.status(201).send(recipe);
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

// JSON body parsing using built-in middleware
app.use(express.json());


var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// New recipe
apiRouter.post('/auth/newrecipe', async (req, res) => {

});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
