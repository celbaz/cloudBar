var ipc = window.require('ipc');
var Reflux = require('reflux');
var _ = require('underscore');
var Actions = require('../actions/actions');

var AudioStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._trackqueue = [];
    this._audioBeingPlayed = new Audio();
    this._dataBeingPlayed = null;
    // Add the loop scenario where you just rotate.
    var self = this;
    this._audioBeingPlayed.onended = function() {
        self.playNextSound();
    };
  },

  buildStreamURL: function (id) {
    return (
      "https://api.soundcloud.com/tracks/" + id + "/stream?oauth_token="
      + window.localStorage.getItem('soundcloudtoken')
    );
  },

  addToQueue: function (track) {
    if(!this.currentlyPlaying()) {
      this.playSound(track.id);
    } else {
      this._trackqueue.push(track);
    }
  },

  // quick fix
  currentlyPlaying: function () {
    return (!this._audioBeingPlayed.paused);
  },

  removeFromQueue: function (track_id) {
    var i, len;
    for(i = 0, len = this._trackqueue.length; i < len; i++) {
      if(this._trackqueue[i].id === track_id) {
        this._trackqueue.splice(index, 1);
        return true;
      }
    }
    return false;
  },

  playSound: function (stream_id, currentsong) {
    this._dataBeingPlayed = currentsong;
    var audio = this._audioBeingPlayed;
    audio.src = this.buildStreamURL(stream_id);
    audio.play();
  },

  playNextSound: function () {
    if(this._trackqueue.length > 0) {
      var track = this._trackqueue.pop()
      this.playSound(track.id);
    } else {
      alert("Your Queue is Empty");
    }
  },

  pauseSound: function () {
    this._audioBeingPlayed.pause();
  },

  stopSound: function () {
    this._audioBeingPlayed.pause();
  }
});

module.exports = AudioStore;
