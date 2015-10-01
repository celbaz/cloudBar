var Reflux = require('reflux');
var Actions = require('../actions/actions');
var Loading = require('reloading');
var apiRequests = require('../utils/api-requests');

var SearchStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._searchResults = [];
    this._resultsCount = JSON.parse(localStorage.getItem('settings')).resultsCount;
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
    var creds, query, fieldType, searchtype = window.localStorage.getItem('searchtype');

    creds = '?oauth_token=' + window.localStorage.getItem('soundcloudtoken');
    if (searchtype === "playlists") {
      fieldType = searchtype;
      query = '&q=' + this._searchTerm;
    } else {
      fieldType = 'tracks';
      query = (searchtype === 'title') ? '&q=' : '&' + searchtype + '=';
      // query +=   '=';
      query += encodeURIComponent(this._searchTerm) + '&filter=streamable';
    }

    query += '&limit=' + this._resultsCount;
    return fieldType + creds + query;
  },

  onGetSearchResults: function () {

    apiRequests
      .get('https://api.soundcloud.com/' + this.prepareURL())
      .end(function (err, response) {
        if (response && response.ok) {
          // Success - Do Something.
          Actions.getSearchResults.completed(response.body);
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
