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
        <div key={item.id} className="search-item group">
            <img
              src={ item.avatar_url || item.artwork_url}
              onClick={self.playSong}
              data-stream={item.stream_url} />
            <div>
              <h3 className="song-artist">
                {item.username || item.user.username}
              </h3>
              <p className="song-title">
                {item.title}
              </p>
              <span>
                <p className="song-comments">
                  {item.comment_count}
                </p>
                <p className="song-likes">
                  {item.likes_count}
                </p>
                <p className="song-plays">
                  {item.playback_count}
                </p>
              </span>
            </div>
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
      <div className="search-items">
        {content}
      </div>
    );
  }
});

module.exports = SearchItems;
