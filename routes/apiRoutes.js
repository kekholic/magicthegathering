const express = require('express');

const apiRoutes = express.Router();

const fetch = require('node-fetch');

const parser = require('../lib/parseToQuery');

apiRoutes.get('/search/:str', async (req, res) => {
  // console.log(req.params);
  const string = parser(req.params.str);
  const response = await fetch(`https://api.scryfall.com/cards/search?q=${string}`);
  const result = await response.json();
  res.json(result);
});

module.exports = apiRoutes;
