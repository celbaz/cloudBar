var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var AudioStore = require('../stores/audio');

var PlayerInfo = React.createClass({

  mixins: [
    Reflux.connect(AudioStore),
    Reflux.listenTo(Actions.getCurrentPlay, "setTrack")
  ],

  getInitialState: function () {
    return this.props;
  },

  setTrack: function () {
    this.setState({ change: true});
  },

  render: function () {
    var user = (this.state.user) ? this.state.user.username : "N/A";
    return (
      <div className="player-info">
        <div className="player-info-text">
          <h2 className="player-song-name">{this.state.title || "N/A"}</h2>
          <h3 className="player-artist">{user}</h3>
        </div>
        <div className="player-cover">
          <img src={this.state.artwork_url || "assets/default.jpg"}
            width="300"/>
        </div>
      </div>
    );
  }
});

module.exports = PlayerInfo;
