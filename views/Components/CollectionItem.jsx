const React = require('react');

function collectionItem({ collection }) {
  return (
    <div data-id={collection.id} className="js-collection col-12 col-md-6 col-lg-4 mb-4 one-card-collection">
      <div className="card  newCardBody">
        <div className="card-img-several">
          <img src="/images/logoCollection.png" className="card-img-top card-img-top-collection" alt="image1" />
          {/* <img src="https://images.saymedia-content.com/.image/t_share/MTc0NDYwNzc3ODAxODUyMjY0/top-magic-the-gathering-cards-of-all-time.jpg" className="card-img-top card-img-top-collection" alt="image2" />
          <img src="https://c1.scryfall.com/file/scryfall-cards/large/front/2/b/2b73d294-6ab1-4051-9b0f-d8e335d37674.jpg?1626097096" className="card-img-top card-img-top-collection" alt="image3" /> */}
        </div>
        <div className="card-body">
          <h3 className="card-title zag">
            {collection.title}
          </h3>
          <p>Цена: {collection.price}$</p>
          <p>Карт в коллекции: {collection.ownedCount}/{collection.allCount}</p>
          <p>Создано: {collection.createdAt.toLocaleDateString('ru-RU')}</p>
          <p className="mb-0 mbbb">
            <button
              type="button"
              data-edit-coll="edit-coll"
              className="btn btn-secondary btn-first"
            >
              Редактировать
            </button>
            <button
              type="button"
              data-delete-coll="delete-coll"
              className="btn btn-secondary btn-first"
            >
              Удалить
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

module.exports = collectionItem;
