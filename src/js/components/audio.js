var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var ipc = window.require('ipc');

var Actions = require('../actions/actions');
var AudioStore = require('../stores/audio');

var Audio = React.createClass({
  contextTypes: {
  },

  // have a store that manages the queue and signals
  // to the view when to update.

  componentDidMount: function () {
    // Play Test Sounds and queue playback
    // AudioStore.playNextSound();
    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 32) {
        if(AudioStore._audioBeingPlayed.paused) {
          AudioStore._audioBeingPlayed.play();
        } else {
          AudioStore._audioBeingPlayed.pause();
        }
      } else if (e.keyCode === 187) {
        AudioStore.playNextSound();
      }
    });

  },

  render: function () {
    return (
      <p></p>
    );
  }
});

module.exports = Audio;
