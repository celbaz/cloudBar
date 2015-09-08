var React = require('react');
var Reflux = require('reflux');
// var shell = remote.require('shell');



var AudioPlayer = React.createClass({

  getInitialState: function () {
    var song = localStorage.getItem('currentsong');
    song = song || "https://api.soundcloud.com/tracks/199564903/stream";
    return { stream: song };
  },

  componentDidMount: function () {
    audiojs.events.ready(function() {
    var as = audiojs.createAll();
    });
  },

  render: function () {
    var stream = this.state.stream + "?oauth_token=" + localStorage.getItem('soundcloudtoken');

    return (
      <div className="main-container">
      <audio src={stream} preload="auto"></audio>
      </div>
    );
  }
});


module.exports = AudioPlayer;
// html
