var React = require('react');
var _ = require('underscore');
var Router = require('react-router');
var AudioStore = require('../stores/audio');
var convertMsToMin = function (ms) {
  var min, sec;

  min = Math.floor(ms / 60000);
  sec = Math.round(ms % 60000 / 1000);

  if (sec < 10) {
    sec = "0" + sec;
  }

  return min + ":" + sec;
};

var SearchItems = React.createClass({

  getInitialState: function () {
    return {};
  },

  mixins: [
    Router.State
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  soundConnect: function (event) {
    var id = event.target.parentElement.attributes.getNamedItem('data-stream').value;
    if(event.target.textContent.includes('Play')) {
      AudioStore.playSound(id);
    } else {
      AudioStore.addToQueue({stream_id: id});
    }
  },

  generateResults: function () {
    return this["generate" + this.props.resultType]();
  },

  generateTracks: function () {
    // TODO: add browser links to website
    var self = this;
    return _.map(this.props.searchResults, function (item) {
      return (
        <li key={item.id} className="search-item group">
          <figure>
            <img src={ item.avatar_url || item.artwork_url}/>
          </figure>

          <article className="track-info">
            <h3 className="song-title ellipsis">
              {item.title}
            </h3>

            <h4 className="song-artist ellipsis">
              {item.username || item.user.username}
            </h4>

            <div className="options-wrapper">
              <ul className="meta group">
                <li className="song-plays">
                  <i className="icon-play" />
                  {item.playback_count || 0}
                </li>

                <li className="song-likes">
                  <i className="icon-heart" />
                  {item.likes_count || item.favoritings_count || 0}
                </li>

                <li className="song-length">
                  <i className="icon-clock" />
                  {convertMsToMin(item.duration)}
                </li>
              </ul>

              <div data-stream={item.id} className="play-options">
                <button className="play-button icon-play" onClick={self.soundConnect}>Play Track</button>
                <button className="add-button"  onClick={self.soundConnect}>Add to Queue</button>
              </div>
            </div>
          </article>
        </li>
      );
    });
  },

  generatePlaylists: function () {
    var self = this;

    return _.map(this.props.searchResults, function (list) {
      // Playlist Info

      var playlistType;

      if (list.playlist_type) {
        playlistType = (
          <li className="playlist-type">
            {list.playlist_type}
          </li>
        );
      }

      return (
        <li key={list.id}
          className="search-item playlist group"
          onClick={self.renderSongs}>

          <figure>
            <img src={list.artwork_url} />
          </figure>

          <article className="track-info">
            <h3 className="song-title ellipsis">
              {list.title}
            </h3>

            <h4 className="song-artist ellipsis">
              {list.user.username}
            </h4>

            <div className="options-wrapper">
              <ul className="meta group">
                <li className="track-count">
                  <i className="icon-play" />
                  {list.track_count} song(s)
                </li>

                {playlistType}
              </ul>

              <div className="play-options">
                <button className="play-button icon-play">
                  Start Playlist
                </button>
              </div>
            </div>
          </article>
        </li>
      );
    });
  },

  noResults: function () {
    return (
      <span className="search-init">
        Click on the input box above to search.
      </span>
    );
  },

  render: function () {
    var content = (Array.isArray(this.props.searchResults)) ? this.generateResults() : this.noResults();

    return (
      <ul className="search-items">
        {content}
      </ul>
    );
  }
});

module.exports = SearchItems;
