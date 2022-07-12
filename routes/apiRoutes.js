const express = require('express');

const apiRoutes = express.Router();

const fetch = require('node-fetch');

apiRoutes.get('/search', async (req, res) => {
  const response = await fetch('https://api.scryfall.com/cards/f295b713-1d6a-43fd-910d-fb35414bf58a');
  const result = await response.json();
  res.json(result);
});

module.exports = apiRoutes;
