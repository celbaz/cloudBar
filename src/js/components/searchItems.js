var React = require('react');
var _ = require('underscore');
var Router = require('react-router');
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

  playSong: function (event) {
    var stream_url = event.target.attributes.getNamedItem('data-stream').value;
    window.localStorage.setItem('currentsong', stream_url);
    console.log(window.localStorage.getItem('currentsong'));
    this.context.router.transitionTo('player'); //playstream
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
            <img
              src={ item.avatar_url || item.artwork_url}
              onClick={self.playSong}
              data-stream={item.stream_url} />
          </figure>

          <article className="track-info">
            <h3 className="song-title ellipsis">
              {item.title}
            </h3>

            <h4 className="song-artist ellipsis">
              {item.username || item.user.username}
            </h4>

            <ul className="meta group">
              <li className="song-plays">
                <i className="icon-play" />
                {item.playback_count}
              </li>

              <li className="song-likes">
                <i className="icon-heart" />
                {item.likes_count}
              </li>
            </ul>
          </article>
        </li>
      );
    });
  },

  generatePlaylists: function () {
    var self = this;
    return _.map(this.props.searchResults, function (list) {
      // Playlist Info
      return (
        <div key={list.id} className="playlist-container" onClick={self.renderSongs}>
          <ul>
            <li>track_count: {list.track_count}</li>
            <li>artwork_url: {list.artwork_url}</li>
            <li>created_at: {list.created_at}</li>
            <li>playlist_type: {list.playlist_type}</li>
          </ul>
        </div>
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
