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
    // Play Test Sound
    AudioStore.playSound();

    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 81) {
        AudioStore.pauseSound();
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
