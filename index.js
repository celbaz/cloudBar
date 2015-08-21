var menubar = require('menubar');
// var BrowserWindow = require('BrowserWindow');
var Auth = require('./app/auth');

var mb = menubar({
  dir: __dirname,
  // index: 'file://' +  __dirname + '/html/index.html'
  index: 'file://' + __dirname + '/index.html'
});

mb.on('ready', function ready () {
  console.log('app is ready')
  console.log('directory name is', __dirname)
});

mb.on('after-show', function afterShow () {
  console.log("\n\n\n HELLO \n");
  // Auth();
});
