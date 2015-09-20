var React = require('react');
var Router = require('react-router');

var AuthStore = require('./stores/auth');
var Navigation = require('./components/navigation');
var Footer = require('./components/footer');
var PlayerPage = require('./components/player');
var ProfilePage = require('./components/profile');
var SearchPage = require('./components/search');
var LikePage = require('./components/like');
var LoginPage = require('./components/login');
var SettingsPage = require('./components/settings');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (transition.path !== '/login' && !AuthStore.authStatus()) {
        console.log('Not logged in. Redirecting to login.');
        transition.redirect('login', {});
      }
    }
  },

  render: function () {
    return (
      <div>
        <Navigation />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
});

var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={SearchPage} />
    <Route name="search" handler={SearchPage}/>
    <Route name="profile" handler={ProfilePage}/>
    <Route name="like" handler={LikePage}/>
    <Route name="login" handler={LoginPage}/>
    <Route name="settings" handler={SettingsPage}/>
    <Route name="player" handler={PlayerPage} />
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
