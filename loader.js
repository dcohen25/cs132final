var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://chatroom.db');

conn.query('DROP TABLE IF EXISTS messages;');

var cmd = 'CREATE TABLE messages (' + 
    	'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    	'room TEXT,' + 
    	'nickname TEXT,' +
    	'body TEXT,' +
    	'time INTEGER);';

conn.query(cmd).on('end', function() {
	console.log('Made new table!');
});