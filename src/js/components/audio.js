var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var remote = window.require('remote');
var globalShortcut = remote.require('global-shortcut');
var Actions = require('../actions/actions');
var AudioStore = require('../stores/audio');

var Audio = React.createClass({
  contextTypes: {
  },

  // have a store that manages the queue and signals
  // to the view when to update.

  componentDidMount: function () {
    // Play Test Sounds and queue playback
    var ret = globalShortcut.register('MediaPlayPause', function() {
      if(AudioStore._audioBeingPlayed.paused) {
        AudioStore._audioBeingPlayed.play();
      } else {
        AudioStore._audioBeingPlayed.pause();
      }
    });

    globalShortcut.register("MediaNextTrack", function() {
      AudioStore.playNextSound();
    });
  },

  render: function () {
    return (
      <p></p>
    );
  }
});

module.exports = Audio;
