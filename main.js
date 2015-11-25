var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var bodyParser = require('body-parser');
var characters = JSON.parse(fs.readFileSync('characters.json', 'utf8'));
var defaultCharacter = {
    name: 'Name Character',
    stats: [
        { name: "Strength", value: 10, modifier: 0 },
        { name: "Dexterity", value: 10, modifier: 0 },
        { name: "Constitution", value: 10, modifier: 0 },
        { name: "Intelligence", value: 10, modifier: 0 },
        { name: "Wisdom", value: 10, modifier: 0 },
        { name: "Charisma", value: 10, modifier: 0 }
    ],
    proficiencyBonus: 2
};

app.use(bodyParser.json());

app.use(express.static('public/dist'));

app.post('/save-character', function (req, res) {
	console.log('character:', req.body);
	characters.push(req.body);
	res.end("yes");
});

app.get('/character-data', function(req, res) {
	console.log('Sending character', characters);
	res.send(characters);
});

server.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	if(characters.length === 0) {
		characters.push(defaultCharacter);
	}

	console.log('Example app listening at http://%s:%s', host, port);
});

io.on('connection', function(socket) {
	console.log('connection made');

	socket.on('roll', function(data) {
		console.log('roll performed: ', data);
		io.emit('rollResult', data);
	});
});

process.on('SIGINT', function() {
	console.log('saving then shutting down...');
	fs.writeFile('characters.json', JSON.stringify(characters), function(err) {
		if(err) throw err;
		console.log('characters saved');
		process.exit();
	});
});