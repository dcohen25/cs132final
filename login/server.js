var http = require('http');
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passportSocketIo = require('passport.socketio');
var configDB = require('./config/database.js');
var path = require('path');

var server = http.createServer(app);
mongoose.connect(configDB.url);
console.log('db connected');

require('./config/passport')(passport); 

// app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser()); 

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
// socketio passport middleware
var sessionMiddleware = session({ 
	secret: 'biodigestor:cs132_final',
    	store: new (require('connect-mongo/es5')(session))({
		url: configDB.url
	})
});

// required for passport
app.use(sessionMiddleware)
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./app/routes.js')(app, passport); 

var averageWaste = 150;
var averageHome = 11000;
var bioPower = 350;

// Publisher ID for City Grid Media Places API
var apiKey = '&publisher=10000015998';


validateUserCredentials = function(form){
	// validate email input
	if (!form.local.email || !form.local.email.trim()){
		err = "validateUserCredentials: Email is invalid.";
		return err;
	}
	// validate password input
	if (!form.local.password || !form.local.password.trim()){
		err = "validateUserCredentials: Password is invalid.";
		return err;
	}
	// validate first name input
	if (!form.local.firstName || !form.local.firstName.trim()){
		err = "validateUserCredentials: First name is invalid.";
		return err;
	}
	// validate last name input
	if (!form.local.lastName || !form.local.lastName.trim()){
		err = "validateuserCredentials: Last name is invalid";
		return err;
	}
	// credentials are valid
	return null;
}
// Requests API data on # of restaurants
function countRestaurants(city, state, callback) {		
	
	var location = city.split(' ').join('+') + ',' + state.split(' ').join('+');

	var request = http.request({
		host: 'api.citygridmedia.com',
		path: '/content/places/v2/search/where?type=restaurant&format=json&where=' + location + apiKey 

	}, function(res) {
		var data = '';
		
		res.on('data', function(d) {
			data += d;
		});
		
		res.on('end', function() {
			console.log('before');
			console.log(data);
				
			var results = JSON.parse(data).results;

			console.log('after');

			if (results == null) {
				callback(null);
			} else {
				callback(results.total_hits, results.regions[0].name);
			}					
		});

	});

	request.on('error', function(e) {
		console.log(e.message);
	});

	request.end();
}

app.post('/biodigester', function(request, response) {
	console.log('- Request received:', request.method, request.url);

	var city = request.body.city;
	var state = request.body.state;	

	if (city == null || city == "" || state == null || state == "") {
		response.render('bio-index.ejs', {error : true});
	
	} else {
		countRestaurants(city, state, function(count, region) {
			if (count == null) {
				response.render('bio-index.ejs', {error : true});
			} else {
				var restaurants = count;
				var tons = restaurants * averageWaste;
				var kwh = tons * bioPower;
				var homes = Math.floor(kwh / averageHome);

				var parameters = {
					city : region,
					state : state,
					restaurants : formatString(restaurants),
					tons : formatString(tons),
					kwh : formatString(kwh),
					homes : formatString(homes)
				}
				response.render('bio-results.ejs', parameters);
			}
		});					
	}
});

// Formats numerical string to include commas
function formatString(str) {
	return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var user = require('./app/models/user');
var dp = require('./app/models/dp');
var survey = require('./app/models/question');
var io = require("socket.io").listen(server);
var passInit = passport.initialize();
var passSess = passport.session();
io.use(function(socket, next){
	  var cookieParse = cookieParser();
	  cookieParse(socket.request, {}, next);
	  socket.request.originalUrl = socket.request.url;
	  sessionMiddleware(socket.request, {}, next);
	  passInit(socket.request, {}, next);
	  passSess(socket.request, {}, next);
});
io.on('connection', function(socket){
	// update user credentials
	socket.on('updateUserCredentials', function(userForm, callback){
		// validate user credentials
		err = validateUserCredentials(userForm);
		// if an error occured
		if (err){
			// return error
			callback(err);
		}
		// clean the credentials
		userForm.email = userForm.local.email.trim().toLowerCase();
		userForm.password = userForm.local.password.trim().toLowerCase();
		userForm.firstName = userForm.local.firstName.trim().toLowerCase();
		userForm.lastName = userForm.local.lastName.trim().toLowerCase();
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;
		// update user credentials
		user.update({"_id": userId}, {
			'local.email': userForm.email, 
			'local.password': user.generateHash(userForm.password), 
			'local.firstName': userForm.firstName, 
			'local.lastName': userForm.lastName
		}, function(err, numAffected){
			// if an error occured
			if (err){
				// return the error
				callback("updateuserCredentials: " + err.message);
			}
			// success
			callback(null);
		});
	});
	// get user
	socket.on('getUser', function(callback){
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;
		// get user
		user.findOne({'_id': userId}, 'local.email local.firstName local.lastName tasks cfp', function(err, user){
			// if an error occured
			if (err){
				// return the error
				callback("getUser: " + err.message, null);
			}
			// success
			callback(null, user);
		});
	});
	// update tasks
	socket.on('updateTasks', function(tasks, callback){
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;

		// update tasks
		user.update({'_id':userId}, {'tasks': tasks}, function(err, numAffected){
			// if an error occured
			if (err){
				// return the error
				callback("updateTasks: " + err.message);
			}
			// success
			callback(null);
		});
	});
	// update cfp
	socket.on('updateCfp', function(cfp, callback){
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;
		// update cfp
		user.update({'_id': userId}, {'cfp': cfp}, function(err, numAffected){
			// if an error occured
			if (err){
				// return the error
				callback("updateCfp: " + err.message);
			}
			// success
			callback(null);
		});
	});
	// get graph data
	socket.on('getGraphData', function(callback){
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;
		// get the unique dates (day month year) of the cfp data points belonging to user, sort by year, month, day in ascending order
		dp.aggregate([
				{$match : {
						  // select user's datapoints
						  'userId' : userId
					  }
				},
				{$sort : {
						 // sort by date in ascending order
						 'date' : 1
					 }
				}
		], function(err, data){
			// if an error occured
			if (err){
				// return the error
				callback("getGraphData: " + err.message, null);
			}
			else {
				// sucess
				callback(null, data);
			}
		});
	});
	// add graph data
	socket.on('updateGraphData', function(data, callback){
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;
		// iterate over graph data
		for (var i = 0; i < data.length; i++){
			// set user id
			data[i].userId = userId;
		}	
		// update graph data
		dp.collection.insert(data, function(err, docs){
			// if an error occured
			if (err){
				// return error
				callback("updateGraphData: " + err.message);
			}
			else {
				// success
				callback(null);
			}
		});
	});
	// get questions
	socket.on('getSurveyData', function(callback){
		// get user id
		while (!socket.request.session){};
		userId = socket.request.session.passport.user;
		// get questions
		survey.aggregate([{
					$sort : {
						 // sort by category in ascending order
						 'category' : 1
					 }
		}], function(err, data){
			// if an error occured
			if (err){
				// return error
				callback(err, null);
			}
			// success
			callback(err, data);
		});
	});
});
// connect to server
server.listen(8081, function() {
    console.log('- Server listening on port 8080');
});
