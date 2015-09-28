var React = require('react');
var _ = require('underscore');
var Router = require('react-router');
var AudioStore = require('../stores/audio');
var PlaylistItem = require('./playlistItem');

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

  playTrack: function (track) {
    AudioStore.playSound(track.id, track);
    this.context.router.transitionTo('player');
  },

  addToQueue: function (track) {
    AudioStore.addToQueue(track);
  },

  generateResults: function () {
    return this["generate" + this.props.itemType]();
  },

  generateTracks: function () {
    // TODO: add browser links to website
    var self = this;
    return _.map(this.props.searchResults, function (item, index) {
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

              <div className="play-options">
                <button
                  className="play-button icon-play"
                  onClick={self.playTrack.bind(self, item)}>
                  Play Track
                </button>

                <button
                  className="add-button"
                  onClick={self.addToQueue.bind(self, item)}>
                  Add to Queue
                </button>
              </div>
            </div>
          </article>
        </li>
      );
    });
  },

  generatePlaylists: function () {
    return _.map(this.props.searchResults, function (list) {
      return (
        <PlaylistItem playlist={list} key={"list-" + list.id} />
      );
    });
  },

  render: function () {
    if (Array.isArray(this.props.searchResults)) {
      return (
        <ul className="search-items">
          {this.generateResults()}
        </ul>
      );
    } else {
      return (
        <strong className="loading">Loading...</strong>
      );
    }
  }
});

module.exports = SearchItems;
