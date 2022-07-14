const React = require('react');

const Layout = require('../Layout');
const CollectionItem = require('../Components/CollectionItem');

module.exports = function NewCollection({ collections, login }) {
  return (
    <Layout login={login}>
      {collections
        && collections.map((collection) => (
          <CollectionItem collection={collection} key={collection.id} />
        ))}
      <div className="input-group mb-3 fixCardInput">
        <input type="text" data-id-input="create-input" className="form-control" placeholder="Введите название коллекции" />
        <button type="submit" data-id-button="create-button" className="btn btn-outline-secondary fixCardInputbtn">Создать</button>
      </div>
    </Layout>
  );
};
