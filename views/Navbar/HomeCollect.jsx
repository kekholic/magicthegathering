const React = require('react');
const CollectionItem = require('../Components/CollectionItem');

module.exports = function NewCollection({ collections }) {
  return (
    <>
      {collections
        && collections.map((collection) => (
          <CollectionItem collection={collection} key={collection.id} />
        ))}
      <input type="text" data-id-input="create-input" />
      <button type="submit" data-id-button="create-button">Create!</button>
    </>
  );
};
