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
      client_id: '68c7400f38328848d4eeea65d8eec5dc',
      client_secret: '196357e64e7636dd1eb75db21b4e0c98',
      redirect_uri: 'http://www.google.com'
    };

    //Build the OAuth consent page URL
    var authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: true,
      'node-integration': false
    });
    var githubUrl = 'https://soundcloud.com/connect?';
    var authUrl = githubUrl + 'client_id=' + options.client_id + '&redirect_uri=' + options.redirect_uri + "&response_type=token";
    authWindow.loadUrl(authUrl);
    console.log(authUrl);
    authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {

      var raw_code = /code=([^&]*)/.exec(newUrl) || null;
      var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(newUrl);

      if (code || error) {
        // Close the browser if code found or error
        // authWindow.close();
      }

      // If there is a code, proceed to get token from github
      if (code) {
        self.requestGithubToken(options, code);
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

  requestGithubToken: function (options, code) {
    var self = this;

    apiRequests
      .post('https://api.soundcloud.com/oauth2/token', {
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code
      })
      .end(function (err, response) {
        if (response && response.ok) {
          // Success - Do Something.
          Actions.login(response.body.access_token);
          self.context.router.transitionTo('notifications');
          ipc.sendChannel('reopen-window');
        } else {
          // Error - Show messages.
          // Show appropriate message
        }
      });
  },

  render: function () {
    return (
      <div className="container-fluid main-container login">
        <div className='row'>
          <div className='col-xs-offset-2 col-xs-8'>
            <button className='btn btn-default btn-lg btn-block' onClick={this.authSoundCloud}>
              Log in to SoundCloud
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
