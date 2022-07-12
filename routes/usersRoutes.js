const express = require('express');

const usersRoutes = express.Router();

const NewCollectionPage = require('../controller/usersRoutes');

usersRoutes.get('/:id/collection/new', NewCollectionPage);

module.exports = usersRoutes;
