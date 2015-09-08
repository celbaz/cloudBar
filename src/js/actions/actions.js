var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'login': {},
  'logout': {},
  'getProfile': {asyncResult: true},
  'getNotifications': {asyncResult: true},
  'removeNotification': {},
  'removeRepoNotifications': {},
  'isNewNotification': {},
  'updateSearchTerm': {},
  'clearSearchTerm': {},
  'getSearchResults': {asyncResult: true},
  'setSetting': {}

});

module.exports = Actions;
