var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var bodyParser = require('body-parser');
var characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));
var characterModel = require('./model/character-model.js');
var crypto = require('crypto');
var roller = require('./server/roller.js');

app.use(bodyParser.json());

app.use(express.static('public/dist'));

app.post('/submit-roll', function(req, res) {
	console.log('roll request recieved', req.body);

	var rollOptions = req.body;
	var character = characters[rollOptions.characterGuid];

	console.log('character rolling', character.name);

	var rollResult = roller.performRoll(rollOptions, character)
	console.log('rolling result', rollResult);

	res.end("ok");

	io.emit('rollResult', rollResult);
});

app.post('/save-character', function (req, res) {
	var character = req.body;
	character.guid = generateGuid();
	console.log('guid is', character.guid);

	characters[character.guid] = character;
	res.end("yes");
});

app.get('/character-data', function(req, res) {
	console.log('Sending character', characters);
	res.send(characters);
});

server.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('characters', characters);

	if(Object.keys(characters).length === 0) {
		console.log('adding sample character');
		var sampleCharacter = characterModel.defaultCharacter;
		sampleCharacter.guid = generateGuid();
		console.log('guid is', sampleCharacter.guid);
		characters[sampleCharacter.guid] = characterModel.defaultCharacter;
	}

	console.log('Example app listening at http://%s:%s', host, port);
});

io.on('connection', function(socket) {
	console.log('connection made');

	socket.on('roll', function(data) {
		console.log('roll performed: ', data);
		io.emit('rollResult', data);
	});

	socket.on('addCharacter', function(data) {
		console.log('adding character to table', data.name);
		io.emit('addCharacter', data);
	});

	socket.on('healthChange', function(data) {
		var character = characters[data.guid];
		console.log('changing health for', character.name);
		character.currentHitPoints = data.hitPoints;
		io.emit('characterHealthUpdated', data);
	});

	socket.on('displayCastingMod', function(data) {
		characters[data.guid] = data;
		console.log('updating character to displayCastingMod', characters[data.guid].name);
		io.emit('updateCharacterDisplay', data);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

function generateGuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = crypto.randomBytes(1)[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}

process.on('SIGINT', function() {
	console.log('saving then shutting down...');
	fs.writeFile('characters.json', JSON.stringify(characters), function(err) {
		if(err) throw err;
		console.log('characters saved');
		process.exit();
	});
});
