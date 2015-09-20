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
              {item.username || item.user.username}
            </h3>
            <h4 className="song-artist ellipsis">
              {item.title}
            </h4>
            <span>
              <p className="song-likes">
                {item.likes_count}
              </p>
              <p className="song-plays">
                {item.playback_count}
              </p>
            </span>
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