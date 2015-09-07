var React = require('react');
var Reflux = require('reflux');
var SearchStore = require('../stores/search');
var Actions = require('../actions/actions');

var SearchInput = React.createClass({
  mixins: [
    Reflux.connect(SearchStore, 'searchTerm')
  ],

  onChange: function (event) {
    Actions.updateSearchTerm(event.target.value);
  },

  toggleSearch: function (event) {
    this.searchType = event.target.textContent;
    this.renderField();
  },

  clearSearch: function () {
    Actions.clearSearchTerm();
  },

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    this.searchType = 'Song';
    this.renderField();
  },

  renderField: function () {
    var i, len, options = document.getElementById('search-type').childNodes;

    for(i = 0, len = options.length; i < len; i++) {
      if(options[i].textContent === this.searchType) {
        options[i].setAttribute('class', 'active-field');
      } else {
        options[i].setAttribute('class', ' ');
      }
    }
  },

  render: function () {
    var clearSearchIcon;

    if (this.state.searchTerm) {
      clearSearchIcon = (
        <span className='close-search' onClick={this.clearSearch}>
          <i className="fa fa-times"></i>
        </span>
      );
    }

    return (
      <div className="main-container search">
        <div className='search-bar'>
          <input
            value={this.state.searchTerm}
            onChange={this.onChange}
            className='search'
            type='text'
            placeholder='Search...' />
          {clearSearchIcon}
        </div>
        <div className="search-field" onClick={this.toggleSearch}>
          <div id="search-type">
            <span>Song</span>
            <span>Artist</span>
            <span>Playlist</span>
          </div>
        </div>
        <div className='search-results'>
          Results go here!
        </div>
      </div>
    );
  }
});

module.exports = SearchInput;
