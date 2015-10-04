var remote = window.require('remote');
var ipc = window.require('ipc');
var BrowserWindow = remote.require('browser-window');

var React = require('react');
var apiRequests = require('../utils/api-requests');

var Actions = require('../actions/actions');

var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  authSoundCloud: function () {
    var self = this;

    // Start Login
    var options = {
      client_id: '214389ad8add5d1248a0e8f0c00e0bdc',
      client_secret: 'ff02b6e4f0013681665aba35ebeb57e5',
      redirect_uri: 'http://localhost/callback'
    };

    //Build the OAuth consent page URL
    var authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: true,
      'node-integration': false
    });
    var soundcloudUrl = 'https://soundcloud.com/connect?';
    var authUrl = soundcloudUrl + 'client_id=' + options.client_id + '&redirect_uri=' + options.redirect_uri + "&response_type=code";
    authWindow.loadUrl(authUrl);

    authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
      console.log('Hello', newUrl);
      var raw_code = newUrl.match(/code=([^&]*)/) || null;
      var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(newUrl);

      if (code || error) {
        authWindow.close();
      }

      if (code) {
        self.requestSoundCloudToken(options, code);
      } else if (error) {
        alert('Oops! Something went wrong and we couldn\'t ' +
          'log you in using SoundCloud. Please try again.');
      }

    });

    // If "Done" button is pressed, hide "Loading"
    authWindow.on('close', function () {
      authWindow = null;
    }, false);

  },

  requestSoundCloudToken: function (options, code) {
    var self = this;

    apiRequests
      .post('https://api.soundcloud.com/oauth2/token', {
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri,
        grant_type: 'authorization_code',
        code: code.replace("#", "")
      })
      .end(function (err, response) {
        console.log(response);
        if (response && response.ok) {
          Actions.login(response.body.access_token, response.body.refresh_token);
          self.context.router.transitionTo('search');
        } else {
          // Error - Show messages.
          // Show appropriate message
        }
      });
  },

  render: function () {
    return (
      <div className="login">
        <section className="login-main">
          <h1>Cloudbar</h1>

          <button className="sign-in-button" onClick={this.authSoundCloud}>
            Sign in with SoundCloud
          </button>
        </section>
      </div>
    );
  }
});

module.exports = Login;
