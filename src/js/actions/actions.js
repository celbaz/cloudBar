var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'login': {},
  'logout': {},
  'getProfile': {asyncResult: true},
  'getLikes': {asyncResult: true},
  'updateSearchTerm': {},
  'clearSearchTerm': {},
  'getSearchResults': {asyncResult: true},
  'getCurrentPlay': {},
  'setSetting': {}

});

module.exports = Actions;
