var React = require('react');
var Reflux = require('reflux');
var SearchStore = require('../stores/search');
var Actions = require('../actions/actions');
var SearchItems = require('./searchItems');
var AuthStore = require('./stores/auth');

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
    return { query: "" };
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
    AuthStore.refreshToken();
    this.setState({
      loading: false,
      errors: true
    });
  },

  render: function () {
    var clearSearchIcon, searchResults;

    if (this.state.query !== "") {
      clearSearchIcon = (
        <span className='close-search' onClick={this.clearSearch}></span>
      );
    }

    if (this.state.query) {
      searchResults = (
        <SearchItems
          searchResults={this.state.searchResults}
          itemType={this.searchType === 'playlists' ? "Playlists" : "Tracks"} />
      );
    } else {
      searchResults = (
        <strong className="loading">
          Search for tracks and playlists in the search bar above.
        </strong>
      );
    }

    return (
      <div className="main-container search-container">
        <fieldset className='search-bar'>
          <input
            value={this.state.searchTerm}
            onChange={this.onChange}
            className='search'
            type='text'
            placeholder='Search...' />
          {clearSearchIcon}
        </fieldset>

        <ul id="search-type"
          className="tabs nav group"
          onClick={this.toggleSearch}>
          <li id="title">By Title</li>
          <li id="tags">By Tag</li>
          <li id="username">By Artist</li>
        </ul>

        <div className="search-results">{searchResults}</div>
      </div>
    );
  }
});

module.exports = Search;
