var React = require('react');
var Reflux = require('reflux');
var AudioStore = require('./audio');
// var shell = remote.require('shell');



var AudioPlayer = React.createClass({

  getInitialState: function () {
    var song = localStorage.getItem('currentsong');
    return { playing: false};
  },

  componentDidMount: function () {
  },

  render: function () {
    return (
      <div className="">
        <div className="content">
				<div className="player">
					<div className="player-info">
						<div className="player-info-text">
							<h2 className="player-song-name">Gooey</h2>
							<h3 className="player-artist">Glass Animals</h3>
						</div>
						<div className="player-cover">
						</div>
					</div>
					<div className="player-spectrum">
						<div className="player-spectrum-bars">
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
							<div className="player-spectrum-bar"></div>
						</div>
						<div className="player-spectrum-floor"></div>
					</div>
					<div className="player-controls">
						<div className="player-buttons">
							<button className="player-button">
								<i className="fa fa-bars"></i>
							</button>
							<button className="player-button">
								<i className="fa fa-step-backward"></i>
							</button>
							<button className="player-button play-pause-button">
								<i className="fa fa-pause"></i>
							</button>
							<button className="player-button">
								<i className="fa fa-step-forward"></i>
							</button>
						</div>
						<div className="player-slider"></div>
					</div>
				</div>
			</div>
    </div>
    );
  }
});


module.exports = AudioPlayer;
// html
