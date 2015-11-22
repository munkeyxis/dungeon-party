var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public/dist'));

app.post('/save-character', function (req, res) {
	console.log('character name:', req.body.name);
	fs.writeFile('characters.json', JSON.stringify(req.body), function(err) {
		if(err) throw err;
		console.log('character saved');
	});
	res.end("yes");
});

app.get('/character-data', function(req, res) {
	var json = JSON.parse(fs.readFileSync('characters.json', 'utf8'));
	console.log(json);
	res.send(json);
});

server.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

io.on('connection', function(socket) {
	console.log('connection made');

	socket.on('roll', function(data) {
		console.log('roll performed: ', data);
		io.emit('rollResult', data);
	});
});