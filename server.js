var http = require('http'),
	express = require('express'),
    bodyParser = require('body-parser'),
    anyDB = require('any-db'),
    path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// var conn = anyDB.createConnection('sqlite3://chatroom.db');

// Setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Linking public directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(request, response) {
    response.render('index.ejs');
});


server.listen(8080, function() {
    console.log('- Server listening on port 8080');
});

