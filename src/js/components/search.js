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
    Actions.updateSearchTerm(event.target.value);

    // TODO: set timout and wait for user to stop typing.
    this.setState({
      query: event.target.value,
      searchTerm: event.target.value
    });
    this.getSearchResults(event.target.value);
  },

  toggleSearch: function (event) {
    this.searchType = event.target.id;
    window.localStorage.setItem('searchtype', this.searchType);
    this.renderField();
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
    var startingType = window.localStorage.getItem('searchtype');
    if(startingType) {
      this.searchType = startingType;
    } else {
      this.searchType = 'Tracks';
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
          <li id="Tracks">By Title</li>
          <li id="Users">By Artist</li>
          <li id="Playlists">By Playlist</li>
        </ul>

        <div className="search-results">
          <SearchItems searchResults={this.state.searchResults} resultType={this.searchType === 'Playlists' ? "Playlists" : "Tracks"} />
        </div>
      </div>
    );
  }
});

module.exports = Search;
