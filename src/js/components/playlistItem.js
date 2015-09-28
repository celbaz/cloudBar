var React = require('react');
var AudioStore = require('../stores/audio');

var PlaylistItem = React.createClass({

  getInitialState: function () {
    return {};
  },

  renderTracks: function () {

  },

  startPlaylist: function () {

  },

  render: function () {
    var playlistType;

    if (this.props.playlist.playlist_type) {
      playlistType = (
        <li className="playlist-type">
          {this.props.playlist.playlist_type}
        </li>
      );
    }

    return (
      <li className="search-item playlist group">
        <figure>
          <img src={this.props.playlist.artwork_url} />
        </figure>

        <article className="track-info">
          <h3 className="song-title ellipsis">
            {this.props.playlist.title}
          </h3>

          <h4 className="song-artist ellipsis">
            {this.props.playlist.user.username}
          </h4>

          <div className="options-wrapper">
            <ul className="meta group">
              <li className="track-count">
                <i className="icon-play" />
                {this.props.playlist.track_count} song(s)
              </li>

              {playlistType}
            </ul>

            <div className="play-options">
              <button
                className="play-button icon-clock"
                onClick={this.renderTracks}>
                View Tracks
              </button>

              <button
                className="play-button icon-play"
                onClick={this.startPlaylist}>
                Start Playlist
              </button>
            </div>
          </div>
        </article>
      </li>
    );
  }
});

module.exports = PlaylistItem;
