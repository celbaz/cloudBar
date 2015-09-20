var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'login': {},
  'logout': {},
  'getProfile': {asyncResult: true},
  'updateSearchTerm': {},
  'clearSearchTerm': {},
  'getSearchResults': {asyncResult: true},
  'setSetting': {}

});

module.exports = Actions;
