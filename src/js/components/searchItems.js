var React = require('react');
var _ = require('underscore');

var SearchItems = React.createClass({

  getInitialState: function () {
    return {};
  },

  generateResults: function () {
    // TODO: add browser links to website
    return _.map(this.props.searchResults, function (item) {
      return (
        <div className="search-item">
            <img src={ item.avatar_url || item.artwork_url} />
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
      <span>
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
