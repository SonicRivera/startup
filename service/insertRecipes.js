const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const dbName = 'meltingDB';

const recipes = [{
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

async function insertRecipes() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('recipes');
    const result = await collection.insertMany(recipes);
    console.log(`${result.insertedCount} recipes inserted`);
  } catch (err) {
    console.error('Error inserting recipes:', err);
  } finally {
    await client.close();
  }
}

async function clearRecipes() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('recipes');
        const result = await collection.deleteMany({});
      } catch (err) {
        console.error('Error inserting recipes:', err);
      } finally {
        await client.close();
      }
}

insertRecipes();

// clearRecipes(); // use this when clearing recipes