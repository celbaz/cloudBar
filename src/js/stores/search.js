var Reflux = require('reflux');
var Actions = require('../actions/actions');
var Loading = require('reloading');
var apiRequests = require('../utils/api-requests');
var ipc = window.require('ipc');

var SearchStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._searchResults = [];
  },

  updateTrayIcon: function (searchResults) {
    if (searchResults.length > 0) {
      ipc.sendChannel('update-icon', 'TrayActive');
    } else {
      ipc.sendChannel('update-icon', 'TrayIdle');
    }
  },

  onUpdateSearchTerm: function (searchTerm) {
    this._searchTerm = searchTerm;
    this.trigger(this.searchTerm());
  },

  onClearSearchTerm: function () {
    this._searchTerm = undefined;
    this.trigger(this.searchTerm());
  },

  searchTerm: function () {
    return this._searchTerm;
  },

  prepareURL: function () {
    var creds, query, fieldType;
    creds = '?oauth_token=' + window.localStorage.getItem('soundcloudtoken');
    fieldType = window.localStorage.getItem('searchtype').toLowerCase();
    query = '&q=' + this._searchTerm + '&limit=10';

    return fieldType + creds + query;
  },

  onGetSearchResults: function () {
    var self = this;

    apiRequests
      .get('https://api.soundcloud.com/' + self.prepareURL())
      .end(function (err, response) {
        if (response && response.ok) {
          // Success - Do Something.
          Actions.getSearchResults.completed(response.body);
          self.updateTrayIcon(response.body);
        } else {
          // Error - Show messages.
          Actions.getSearchResults.failed(err);
        }
      });
  },

  onGetSearchResultsCompleted: function (searchResults) {
    this._searchResults = searchResults;
    this.trigger(this._searchResults);
  },

  onGetSearchResultsFailed: function () {
    this._searchResults = [];
    this.trigger(this._searchResults);
  }

});

module.exports = SearchStore;
