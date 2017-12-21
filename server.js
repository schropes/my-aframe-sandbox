//

'use strict';

var url = require('url');
var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

const debug = require('debug')('jjd');

const args = process.argv;
const httpPort = args[args.indexOf("-p") + 1 || args.indexOf("--port") + 1 || -1] || 80;
const httpsPort = args[args.indexOf("-sp") + 1 || args.indexOf("--sport") + 1 || -1] || 443;

// const options = {
// 	key: fs.readFileSync('/etc/letsencrypt/live/jbjw.com/privkey.pem').toString(),
// 	cert: fs.readFileSync('/etc/letsencrypt/live/jbjw.com/fullchain.pem').toString(),
// 	ca: fs.readFileSync('/etc/letsencrypt/live/jbjw.com/chain.pem').toString(),
// };

function log( req, res, next ) {
	req.time = Date.now(); // new Date();
	console.log( `${req.time} ${req.method} ${req.headers.host} ${req.url} ${req.secure ? 'https' : 'http' }` );
	next(); return;
}

function httpsRedirect(req, res, next) {
	if (!req.secure) {
		console.log('redirecting to https');
		res.redirect(`https://${req.headers.host}${req.url}`);
	}
	next(); return;
}

const app = express();

// app.use, app.post, etc
app.use(log);
app.use(express.static(__dirname, {index: 'index.html'}));
// app.use(httpsRedirect);

app.get('/', function(req, res){
	res.send('get received');
});

app.post('/', function (req, res) {
	res.send('post received')
});

const httpServer = http.createServer( app );
httpServer.listen(httpPort, function () {
	console.dir(httpServer.address().port)
	// console.log(`https listening on port ${httpsPort}`);
});

// const httpsServer = https.createServer(options, app);
// httpsServer.listen(httpsPort, function () {
// 	console.log(`https listening on port ${httpsPort}`);
// });

// res.writeHead(200);
// res.write
// res.end(`hello world\n`);

// you can chain createServer().listen()
