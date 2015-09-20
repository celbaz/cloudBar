var React = require('react');
var Reflux = require('reflux');
var remote = window.require('remote');
var shell = remote.require('shell');
var Sections = require('./sections');
var AuthStore = require('../stores/auth');

var Footer = React.createClass({
  mixins: [
    Reflux.connect(AuthStore, 'authStatus')
  ],

  openRepoBrowser: function () {
    shell.openExternal('http://www.carlelbaz.com');
  },

  getInitialState: function () {
    return {
      authStatus: AuthStore.authStatus()
    };
  },

  render: function () {
    var content;
    if(this.state.authStatus) {
      content = <Sections />
    } else {
      content = <span className='github-link' onClick={this.openRepoBrowser}>For More Info<i className="icon-github" /></span>;
    }

    return (
      <nav className='footer'>
        {content}
      </nav>
    );
  }
});

module.exports = Footer;
