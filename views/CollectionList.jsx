const React = require('react');

module.exports = function getCollectionList({ login }) {
  return (
    <div>
      {
        login ? (
          <h1> Yes</h1>
        ) : (
          <h1>Noo</h1>
        )
      }
    </div>
  );
};
