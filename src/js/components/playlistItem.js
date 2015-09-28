var React = require('react');
var AudioStore = require('../stores/audio');

var PlaylistItem = React.createClass({

  getInitialState: function () {
    return {
      expand: false
    };
  },

  renderTracks: function () {
    this.setState({
      expand: true
    });
  },

  tracklist: function () {
    if (!this.state.expand) return;

    var self = this;
    var tracks = this.props.playlist.tracks.map(function (track) {
      return (
        <li key={"track-" + track.id}
          onClick={self.playSong.bind(self, track)}
          className="group">
          <figure className="icon-play">
            <img src={track.artwork_url} />
          </figure>

          <span className="track-info-wrapper ellipsis">
            <strong className="track-title">{track.title}</strong>
            <small className="track-artist">{track.user.username}</small>
          </span>
        </li>
      );
    });

    return (
      <ul className="track-list">{tracks}</ul>
    );
  },

  playSong: function (song) {

  },

  startPlaylist: function () {

  },

  closePlaylist: function () {
    this.setState({
      expand: false
    });
  },

  render: function () {
    var playlistType, classNames, closePlaylist;

    if (this.props.playlist.playlist_type) {
      playlistType = (
        <li className="playlist-type">
          {this.props.playlist.playlist_type}
        </li>
      );
    }

    classNames = "search-item playlist";

    if (this.state.expand) {
      classNames += " expand";
      closePlaylist = <button className="x" onClick={this.closePlaylist} />;
    }

    return (
      <li className={classNames}>
        <section className="group">
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
        </section>

        {this.tracklist()}
        {closePlaylist}
      </li>
    );
  }
});

module.exports = PlaylistItem;
