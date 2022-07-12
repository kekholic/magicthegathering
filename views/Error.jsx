const React = require('react');

module.exports = function Error({ message }) {
  return (
    <div className="alert alert-dark" role="alert">
      {message}
    </div>
  );
};
