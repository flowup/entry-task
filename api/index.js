const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const NOT_FOUND_RESPONSE = { error: 'Not found' };
const BAD_REQUEST__RESPONSE = { error: 'Bad request' };
const RESPONSE_DELAY = 500;
const RECIPES_PATH = '/recipes';
const AUTHORS_PATH = '/authors';

function delay(callback) {
  setTimeout(callback, RESPONSE_DELAY);
}

function isValidRecipe(recipe) {
  return (
    recipe instanceof Object &&
    typeof recipe.title === 'string' &&
    recipe.authorIds instanceof Array &&
    recipe.authorIds.every(id => typeof id === 'string') &&
    typeof recipe.imageUrl === 'string' &&
    recipe.ingredients instanceof Array &&
    recipe.ingredients.every(ingredient => (
      ingredient instanceof Object &&
      typeof ingredient.name === 'string' &&
      typeof ingredient.amount === 'string' &&
      (!('unit' in ingredient) || typeof ingredient.unit === 'string')
    )) &&
    typeof recipe.text === 'string'
  );
}

function isValidAuthor(author) {
  return (
    author instanceof Object &&
    typeof author.id === 'string' &&
    typeof author.email === 'string' &&
    typeof author.name === 'string' &&
    typeof author.avatar === 'string' &&
    typeof author.skill === 'string'
  );
}

let database = {
  authors: require('./authors.json'),
  recipes: require('./recipes.json')
};

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: () => true }));

app.get(AUTHORS_PATH, (_, res) => {
  delay(() => res.json(database.authors));
});

// Create new author API
app.post(AUTHORS_PATH, ({ body }, res) => {
  if (!isValidAuthor(body)) {
    delay(() => res.status(400).json(BAD_REQUEST__RESPONSE));
    return;
  }

  const author = { ...body };
  author.id = Math.random().toString(16).substr(2, 8);
  database = { ...database, authors: [...database.authors, author] };

  delay(() => res.json(author));
});

app.get(`${RECIPES_PATH}/:id`, ({ params }, res) => {
  const recipe = database.recipes
    .find(({ id }) => id === params.id);

  if (recipe == null) {
    delay(() => res.status(404).json(NOT_FOUND_RESPONSE));
    return;
  }

  delay(() => res.json(recipe));
});

app.put(`${RECIPES_PATH}/:id`, ({ params, body }, res) => {
  if (!isValidRecipe(body)) {
    delay(() => res.status(400).json(BAD_REQUEST__RESPONSE));
    return;
  }

  const oldRecipe = database.recipes
    .find(({ id }) => id === params.id);

  if (oldRecipe == null) {
    delay(() => res.status(404).json(NOT_FOUND_RESPONSE));
    return;
  }

  const newRecipe = { ...body, id: oldRecipe.id };
  database = {
    ...database,
    recipes: database.recipes.map(recipe => (
      recipe.id === newRecipe.id ?
        newRecipe :
        recipe
    ))
  };

  delay(() => res.json(newRecipe));
});

app.get(RECIPES_PATH, (_, res) => {
  const simpleRecipes = database.recipes
    .map(recipe => {
      const { ingredients, text, ...rest } = recipe;
      return rest;
    });

  delay(() => res.json(simpleRecipes));
});

app.post(RECIPES_PATH, ({ body }, res) => {
  if (!isValidRecipe(body)) {
    delay(() => res.status(400).json(BAD_REQUEST__RESPONSE));
    return;
  }

  const recipe = { ...body, id: Math.random().toString(16).substr(2, 8) };
  database = { ...database, recipes: [...database.recipes, recipe] };

  delay(() => res.json(recipe));
});

app.listen(3000);
