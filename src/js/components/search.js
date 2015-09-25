var React = require('react');
var Reflux = require('reflux');
var SearchStore = require('../stores/search');
var Actions = require('../actions/actions');
var SearchItems = require('./searchItems');

var Search = React.createClass({
  mixins: [
    Reflux.connect(SearchStore, 'searchResults'),
    Reflux.listenTo(Actions.getSearchResults.completed, 'completedSearchResults'),
    Reflux.listenTo(Actions.getSearchResults.failed, 'failedSearchResults')
  ],

  onChange: function (event) {
    window.clearTimeout(window.timeIn);
    var e = event.target, self = this;
    window.timeIn = window.setTimeout(function () {
      Actions.updateSearchTerm(e.value);

      // TODO: set timout and wait for user to stop typing.
      self.getSearchResults(e.value);
    }, 300);
    self.setState({
      query: e.value,
      searchTerm: e.value
    });
  },

  toggleSearch: function (event) {
    this.searchType = event.target.id;
    if(this.searchType !== localStorage.getItem('searchtype')) {
      window.localStorage.setItem('searchtype', this.searchType);
      this.renderField();
    }
  },

  getSearchResults: function () {
    Actions.getSearchResults();
  },

  clearSearch: function () {
    document.getElementsByClassName('search-bar')[0].firstChild.value = "";
    this.setState({query: ""});
    Actions.clearSearchTerm();
  },

  getInitialState: function () {
    window.timeIn = null;
    var startingType = window.localStorage.getItem('searchtype');
    if(startingType) {
      this.searchType = startingType;
    } else {
      this.searchType = 'title';
      window.localStorage.setItem('searchtype', this.searchType);
    }
    return { query: ""};
  },

  componentDidMount: function () {
    this.renderField();
  },

  renderField: function () {
    var i, len, options = document.getElementById('search-type').childNodes;

    for(i = 0, len = options.length; i < len; i++) {
      if(options[i].id === this.searchType) {
        options[i].setAttribute('class', 'active');
      } else {
        options[i].setAttribute('class', ' ');
      }
    }
    if(this.state.query !== "") this.getSearchResults();
  },

  completedSearchResults: function () {
    this.setState({
      loading: false,
      errors: false
    });
  },

  failedSearchResults: function () {
    this.setState({
      loading: false,
      errors: true
    });
  },

  render: function () {
    var clearSearchIcon;

    if (this.state.query !== "") {
      clearSearchIcon = (
        <span className='close-search' onClick={this.clearSearch}></span>
      );
    }

    return (
      <div className="main-container search">
        <fieldset className='search-bar'>
          <input
            value={this.state.searchTerm}
            onChange={this.onChange}
            className='search'
            type='text'
            placeholder='Search...' />
          {clearSearchIcon}
        </fieldset>

        <ul id="search-type" className="tabs nav group" onClick={this.toggleSearch}>
          <li id="title">By Title</li>
          <li id="tags">By Artist</li>
          <li id="playlists">By Playlist</li>
        </ul>

        <div className="search-results">
          <SearchItems searchResults={this.state.searchResults} resultType={this.searchType === 'playlists' ? "Playlists" : "Tracks"} />
        </div>
      </div>
    );
  }
});

module.exports = Search;
