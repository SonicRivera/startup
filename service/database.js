const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('meltingDB');
const userCollection = db.collection('users');
const recipeCollection = db.collection('recipes');

// Test connection
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function insertUser(user) {
    return userCollection.insertOne(user);
}

function getRecipes() {
    return recipeCollection.find().toArray();
}

function getRecipeById(id) {
    return recipeCollection.findOne({ id: id });
}

function insertRecipe(recipe) {
    return recipeCollection.insertOne(recipe);
}

function updateRecipe(id, update) {
    return recipeCollection.updateOne({ id: id }, { $set: update });
}

module.exports = { getUser, insertUser, getRecipes, getRecipeById, insertRecipe, updateRecipe };