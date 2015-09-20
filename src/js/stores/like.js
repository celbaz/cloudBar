var Reflux = require('reflux');
var Actions = require('../actions/actions');
var Loading = require('reloading');
var apiRequests = require('../utils/api-requests');

var LikeStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._soundcloudLikes = window.localStorage.getItem('soundcloudLikes') || [];
  },

  prepareURL: function () {
    var creds, fieldType;
    creds = '?oauth_token=' + window.localStorage.getItem('soundcloudtoken');
    fieldType = 'me/favorites';

    return fieldType + creds;
  },

  onGetLikes: function () {
    var self = this;

    apiRequests
      .get('https://api.soundcloud.com/' + self.prepareURL())
      .end(function (err, response) {
        window.carl = response;
        if (response && response.ok) {
          Actions.getLikes.completed(response.body);
        } else {
          Actions.getLikes.failed(err);
        }
      });
  },

  onGetLikesCompleted: function (favoritedResults) {
    this._soundcloudLikes = favoritedResults;
    this.trigger(this._soundcloudLikes);
  },

  onGetLikesFailed: function () {
    this._soundcloudLikes = [];
    this.trigger(this._soundcloudLikes);
  }

});

module.exports = LikeStore;
