var http = require('http'),
    server = require('./server/server.js');

var serverPort = server.get('port');

http.createServer(server).listen(serverPort, function(){
  console.log("Express server listening on port " + serverPort);
});
