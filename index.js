var menubar = require('menubar');
var ipc = require('ipc');

// TODO: REMOVE always-on-top flag
var mb = menubar({
  dir: __dirname,
  height: 390,
  width: 300,
  'always-on-top': true,
  index: 'file://' + __dirname + '/index.html'
});

mb.ipc = ipc;

mb.on('ready', function ready () {
  console.log('app is ready')
  console.log('directory name is', __dirname)

  // Place Global Events Here :)
  mb.ipc.on('app-quit', function () {
    console.log("Closing Application");
    mb.app.quit();
  });

  // after authentication re-open app
  mb.ipc.on('reopen-window', function () {
    mb.window.show();
  });
});
