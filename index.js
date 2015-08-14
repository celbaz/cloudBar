var menubar = require('menubar');

var mb = menubar({
  dir: __dirname,
  index: 'file://' +  __dirname + '/html/index.html'
});

mb.on('ready', function ready () {
  console.log('app is ready')
});
