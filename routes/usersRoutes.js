const express = require('express');

const usersRoutes = express.Router();

const { showCollectionPage, showAllCollections, createNewCollection } = require('../controller/usersRoutes');

usersRoutes.get('/:id/collections/:coll/new', showCollectionPage);

usersRoutes.post('/:id/collections/new', createNewCollection);

usersRoutes.get('/:id/collections', showAllCollections);

module.exports = usersRoutes;
