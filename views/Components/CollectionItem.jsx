const React = require('react');

function collectionItem({ collection }) {
  return (
    <div data-id={collection.id} className="js-collection col-12 col-md-6 col-lg-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {collection.title}
          </h5>
          <p className="card-text">
            Price:{collection.price}
            {' '}
            {collection.createdAt.toLocaleDateString('ru-RU')}
          </p>
          <p className="mb-0">
            <button
              type="button"
              className="js-delete btn btn-outline-danger btn-sm me-2"
            >
              Delete collection
            </button>
            <a
              href={`/ponies/${collection.id}`}
              className="btn btn-outline-primary btn-sm disabled"
            >
              Watch collection
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

module.exports = collectionItem;
