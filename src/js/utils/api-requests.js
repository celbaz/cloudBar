var request = require('superagent');
var AuthStore = require('../stores/auth');

var apiRequests = {
  get: function (url) {
    return request
      .get(url)
      .set('Accept', 'application/json');
  },

  post: function (url, params) {
    return request
      .post(url)
      .send(params)
      .set('Accept', 'application/json')
      .set('User-Agent', 'Cloudbar');
  },

  getAuth: function (url) {
    return request
      .get(url)
      .set('Authorization', 'token ' + AuthStore.authStatus())
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Cloudbar');
  },

  putAuth: function (url, params) {
    return request
      .put(url)
      .send(params)
      .set('Authorization', 'token ' + AuthStore.authStatus())
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Cloudbar');
  },

  patchAuth: function (url, params) {
    return request
      .patch(url)
      .send(params)
      .set('Authorization', 'token ' + AuthStore.authStatus())
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Cloudbar');
  }
};

module.exports = apiRequests;
