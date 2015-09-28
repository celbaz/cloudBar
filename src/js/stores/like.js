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
    if(window.localStorage.getItem('liked-component-tab') === "Tracks") {
      fieldType = 'favorites';
    } else {
      fieldType = 'playlists';
    }

    return "me/" + fieldType + creds;
  },

  onGetLikes: function () {
    var self = this;

    apiRequests
      .get('https://api.soundcloud.com/' + self.prepareURL())
      .end(function (err, response) {
        if (response && response.ok) {
          Actions.getLikes.completed(response.body);
        } else {
          Actions.getLikes.failed(err);
        }
      });
  },

  likeTrack: function (id) {
    if(this.currentlyInFavorites(id)){
      apiRequests
        .delete('https://api.soundcloud.com/me/favorites/' + id)
        .end(function (err, response) { return response});

    } else {
      apiRequests
        .put('https://api.soundcloud.com/me/favorites/' + id)
        .end(function (err, response) { return response});
    }
  },

  currentlyInFavorites: function (id) {
    for (var i = 0, len = this._soundcloudLikes.length; i < len; i++) {
      if(this._soundcloudLikes[i].id === id) return true;
    }
    return false;
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
