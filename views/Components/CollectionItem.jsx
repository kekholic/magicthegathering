const React = require('react');

function collectionItem({ collection }) {
  return (
    <div data-id={collection.id} className="js-collection col-12 col-md-6 col-lg-4 mb-4">
      <div className="card">
        
        <div className="card-body">
          <h5 className="card-title">
            {collection.title}
          </h5>
          <p className="card-text">Price: {collection.price}$</p>
          <p>Cards in collection : {collection.ownedCount}/{collection.allCount}</p>
          <p>Created at {collection.createdAt.toLocaleDateString('ru-RU')}</p>
          <p className="mb-0">
            <button
              type="button"
              data-delete-coll="delete-coll"
              className="js-delete btn btn-outline-danger btn-sm me-2"
            >
              Delete collection
            </button>
            <button
              type="button"
              data-edit-coll="edit-coll"
              className="btn btn-outline-primary btn-sm"
            >
              Edit collection
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

module.exports = collectionItem;
