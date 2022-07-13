const React = require('react');

module.exports = function NewCollection() {
  return (
    <div>
      <input type="text" data-id-input="create-input" />
      <button type="submit" data-id-button="create-button">Create!</button>
    </div>
  );
};
