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

  getInitialState: function () {
    return {
      authStatus: AuthStore.authStatus()
    };
  },

  openRepoBrowser: function (event) {
    event.preventDefault();
    shell.openExternal('http://www.carlelbaz.com');
  },

  render: function () {
    if (this.state.authStatus) {
      return (
        <nav className='footer'>
          <Sections />
        </nav>
      );
    } else {
      return (
        <section className="login-footer">
          <small>
            Created by
            <a href="#" onClick={this.openRepoBrowser}>
              Carl Elbaz
              <i className="icon-github-circled" />
            </a>
          </small>
        </section>
      );
    }
  }
});

module.exports = Footer;
