var ipc = window.require('ipc');
var Reflux = require('reflux');
var _ = require('underscore');
var Actions = require('../actions/actions');

var AudioStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._trackqueue = [];
    this._audioBeingPlayed = {};
  },

  testTrack: function () {
    return (
      "https://api.soundcloud.com/tracks/199564903/stream?oauth_token="
      + window.localStorage.getItem('soundcloudtoken')
    );
  },

  playSound: function () {
    var audio = new Audio(this.testTrack());
    audio.play();
    this._audioBeingPlayed = audio;
  },

  pauseSound: function () {
    this._audioBeingPlayed.pause();
  },

  stopSound: function () {
    this._audioBeingPlayed.pause();
  }
});

module.exports = AudioStore;
