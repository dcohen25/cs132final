var cfpApp = angular.module('cfpApp', []);

cfpApp.service('socketService', ['$q', function($q){
	// Get socket
	var socket = io.connect();
	// update user credentials
	this.updateUserCredentials = function(userForm){
		// update user credentials in server
		return $q(function(resolve, reject){
			socket.emit('updateUserCredentials', userForm, function(err){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// updated user credentials
					resolve("Succesfully updated user credentials!");
				}
			});
		});
	}
	// get user
	this.getUser = function(){
		// get user info
		return $q(function(resolve, reject){
			socket.emit('getUser', function(err, user){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// recieved user
					resolve(user);
				}
			});
		});
	}
	// update tasks
	this.updateTasks = function(tasks){
		// update tasks
		return $q(function(resolve, reject){
			socket.emit('updateTasks', tasks, function(err){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// updated tasks
					resolve("Successfully updated user tasks");
				}
			});
		});
	}
	// update cfp
	this.updateCfp = function(cfp){
		// update cfp
		return $q(function(resolve, reject){
			socket.emit('updateCfp', cfp, function(err){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// updated cfp
					resolve("Succesfully updated user cfp");
				}
			});
		});
	}
	// get graph data
	this.getGraphData = function(){
		// get graph data
		return $q(function(resolve, reject){
			socket.emit('getGraphData', function(err, data){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// get data
					resolve(data);
				}
			});
		});
	}
	// update graph data
	this.updateGraphData = function(data){
		// update graph data
		return $q(function(resolve, reject){
			socket.emit('updateGraphData', data, function(err){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// success
					resolve("Succesfully updated graph data");
				}
			});
		});
	}
	// get survey data
	this.getSurveyData = function(data){
		// get survey data
		return $q(function(resolve, reject){
			socket.emit('getSurveyData', function(err, data){
				// if an error occured
				if (err){
					// send error message
					reject(err);
				}
				else {
					// success
					resolve(data);
				}
			});
		});
	}
}]);
cfpApp.service('activeFormService', function (){
	// initialize active form
	this.activeForm = {};
});
cfpApp.controller('userCtrl', ['$scope', 'userService', 'activeFormService', function ($scope, userService, activeFormService){
       // initialize user data
       $scope.user = userService.getUser();
       // initialize user form
       $scope.userForm = angular.copy(userService.getUser());
       // hide form
       $scope.userForm.display = false;
       // update user data
       $scope.updateUserCredentials = function(){
	       // update user data with user form input
	       userService.updateUserCredentials($scope.userForm);
	       // if no errors occured when updating user input
		// close the user form
       }
       // open form
       $scope.openUserForm = function(){
	       // set user form data
	       $scope.userForm = angular.copy(userService.getUser());
	       // hide active form
	       activeFormService.activeForm.display = false;
	       // display user form
	       $scope.userForm.display = true;
	       // set user form to active form
	       activeFormService.activeForm = $scope.userForm;
       }
       // close form
       $scope.closeUserForm = function(){
	       // hide edit user form
	       $scope.userForm.display = false;
       }
}]);
cfpApp.service('userService', ['socketService', function (socketService){
	// initialize user
	User = {};
	// get user data
	socketService.getUser().then(function(user){
		// copy user info
		angular.copy(user, User);
	}, function(reason){
		// user retrieval failed
		console.log(reason);
	});
	// update the user with input values
	this.updateUserCredentials = function(form){
		// if credentials are valid
		if (isValidUserCredentials(form)){
			// update user credentials in client
			User.local.email = form.local.email.trim().toLowerCase();
			User.local.firstName = form.local.firstName.trim().toLowerCase();
			User.local.lastName = form.local.lastName.trim().toLowerCase();
			// persist updated credentials to server
			socketService.updateUserCredentials(form)
			.then(function(successMsg){
				// if user credentials updated succesfully
				console.log(successMsg);
			}, function(reason){
				// user update failed
				console.log(reason);
			});
		}
	}
	// validate credentials
	function isValidUserCredentials(form){
		// intialize valid
		isValid = true;
		// if email is invalid
		if (!form.local.email){
			// set error
			form.emailErr = "Please enter a valid email";
			isValid = false;
		}
		else {
			// reset
			form.emailErr = "";
		}
		// if password is invalid
		if (!form.local.password){
			// set error
			form.passwordErr = "Please enter a valid password";
			isValid = false;
		}
		else {
			// reset
			form.passwordErr = "";
		}
		// if first name is invalid
		if (!form.local.firstName){
			// set error
			form.firstNameErr = "Please enter a valid first name";
			isValid = false;
		}
		else {
			// reset
			form.firstNameErr = "";
		}
		// if last name is invalid
		if (!form.local.lastName){
			// set error
			form.lastNameErr = "Please enter a valid last name";
			isValid = false;
		}
		else {
			// reset
			form.lastNameErr = "";
		}
		return isValid;
	}
	// get the user
	this.getUser = function(){
		return User;
	}
	// remove tasks
	this.removeTask = function(idx){
		// remove task at index
		User.tasks.splice(idx, 1);
		// update user tasks
		this.updateTasks(User.tasks);
	}
	// update tasks
	this.updateTasks = function(tasks){
		// update tasks`
		User.tasks = tasks;
		// persist to server
		socketService.updateTasks(tasks).then(function(successMsg){
			// update succeeded
			console.log(successMsg);
			// update user tasks
		}, function (reason){
			// update failed
			console.log(reason);
		});
	}
	// update cfp
	this.updateCfp = function(cfp){
		// update user cfp
		User.cfp = cfp;
		// persist user cfp in server
		socketService.updateCfp(cfp).then(function(successMsg){
			// update succeeded
			console.log(successMsg);
		}, function(reason){
			// update failed
			console.log(reason);
		});
	}
}]);
cfpApp.controller('cfpCatCtrl', ['$scope', 'graphService', 'activeFormService', function($scope, graphService, activeFormService){
	// initialize cfp categories
	$scope.cfpCat = graphService.getGraph();
	// initialize cfp category input
	$scope.cfpCatForm = angular.copy(graphService.getGraph());
	// hide form
       	$scope.cfpCatForm.display = false;
	// update cfp category
	$scope.updateCategory = function () {
		// update cfp category with input
		graphService.updateCategory($scope.cfpCatForm);
	}
	// open cfp category form
	$scope.openCfpCatForm = function () {
		// set category form data
		$scope.cfpCatForm = angular.copy(graphService.getGraph());
	        // hide active form
	        activeFormService.activeForm.display = false;
	        // display category form
	        $scope.cfpCatForm.display = true;
	        // set category form to active form
	        activeFormService.activeForm = $scope.cfpCatForm;
	}
	// close cfp category form
	$scope.closeCfpCatForm = function () {
		// hide cfp category form
		$scope.cfpCatForm.display = false;
	}
}]);
cfpApp.controller('cfpStartDateCtrl', ['$scope', 'graphService', 'activeFormService', function($scope, graphService, activeFormService) {
	// initialize the date object
	$scope.cfpStartDate = graphService.getGraph();
	// initalize the input date form
	$scope.cfpStartDateForm = angular.copy(graphService.getGraph());
	// hide form
	$scope.cfpStartDateForm.display = false;
	// update start date
	$scope.updateStartDate = function (){
		// update the start date with date form data
	      	graphService.updateStartDate($scope.cfpStartDateForm);
	}
	$scope.openCfpStartDateForm = function (){
		// set start date form data
		$scope.cfpStartDateForm = angular.copy(graphService.getGraph());
	        // hide active form
	        activeFormService.activeForm.display = false;
	        // display start date form
	        $scope.cfpStartDateForm.display = true;
	        // set start date form to active form
	        activeFormService.activeForm = $scope.cfpStartDateForm;
	}
	// close cfp start date form
	$scope.closeCfpStartDateForm = function () {
		// hide cfp start date form
		$scope.cfpStartDateForm.display = false;
	}
}]);
cfpApp.controller('cfpEndDateCtrl', ['$scope', 'graphService', 'activeFormService', function($scope, graphService, activeFormService) {
	// initialize the date object
	$scope.cfpEndDate = graphService.getGraph();
	// initalize the input date form
	$scope.cfpEndDateForm = angular.copy(graphService.getGraph());
	// hide form
	$scope.cfpEndDateForm.display = false;
	// update start date
	$scope.updateEndDate = function (){
		// update the start date with date form data
	      	graphService.updateEndDate($scope.cfpEndDateForm);
	}
	$scope.openCfpEndDateForm = function (){
		// set start date form data
		$scope.cfpEndDateForm = angular.copy(graphService.getGraph());
	        // hide active form
	        activeFormService.activeForm.display = false;
	        // display start date form
	        $scope.cfpEndDateForm.display = true;
	        // set start date form to active form
	        activeFormService.activeForm = $scope.cfpEndDateForm;
	}
	// close cfp start date form
	$scope.closeCfpEndDateForm = function () {
		// hide cfp start date form
		$scope.cfpEndDateForm.display = false;
	}
}]);
cfpApp.service('graphService', ['socketService', function(socketService) {
	//initialize graph
	graph = {};
	// TODO get graph data for user
	socketService.getGraphData().then(function(data){
		// recieved data
		graph.data = data;
		// get graph dates
		graph.dates = [];
		trackDates = {};
		// get graph categories
		graph.categories = [];
		trackCategories = {};
		// iterate through graph data, get unique date and categories
		angular.forEach(graph.data, function(data, idx){
			// convert date to object
			date = new Date(data.date);
			// if date doesn't exist
			if (!trackDates[date.toDateString()]){
				// add date
				trackDates[date.toDateString()] = true;
				graph.dates.push(data.date);
			}
			// if category doesn't exist
			if (!trackCategories[data.category]){
				// add category
				trackCategories[data.category] = true;
				graph.categories.push(data.category);
			}
		});
		// if there are dates, choose newest and oldest date
		if (graph.dates.length != 0){
			graph.startDate = graph.dates[0];
			graph.endDate = graph.dates[graph.dates.length - 1];
		}
		// if there are categories
		if (graph.categories.length != 0){
			// set category
			graph.category = graph.categories[0];
		}
		// if specified a category, start and end date
		if (graph.startDate && graph.endDate && graph.category){
			// get graph data
			renderGraph();
		}
	},
	function(reason){
		// error occured
		console.log(reason);
	});
	// update the graph data
	function renderGraph(){
		// compute graph data
	   var renderData = [];
		// iterate over graph data
		angular.forEach(graph.data, function(data, idx){
			if (graph.category === data.category){
				date = new Date(data.date);
				date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
				startDate = new Date(graph.startDate);
				startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
				endDate = new Date(graph.endDate);
				endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
				if (date >= startDate && date <= endDate){
					renderData.push(data);
				}
			}
		});
		graph.renderData = renderData;
	}


	// add graph data, array of datapoints
	this.updateGraphData = function (data){
		// if graph has no dates
		if (graph.dates.length == 0){
			// add date
			graph.dates.push(data[0].date);
		}
		else {
			// get date
			date = new Date(data[0].date);
			// get most recent date
			endDate = new Date(graph.dates[graph.dates.length - 1]);
			// if date is greater than most recent date
		    	if (date.getFullYear() > endDate.getFullYear() ||
				date.getMonth() > endDate.getMonth() ||
				date.getDate() > endDate.getDate()){
				// add date
				graph.dates.push(data[0].date);
			}
		}
		// iterate over data
		angular.forEach(data, function(dp, idx){
			// add data to graph data points
			graph.data.push(dp);
			// if category doesn't exist
			if (graph.categories.indexOf(dp.category) == -1){
				// add category
				graph.categories.push(dp.category);
			}
		});
		// Add data points to data in database
		socketService.updateGraphData(data).then(function(success){
			// updated data
			console.log(success);
		}, function(reason){
			// update failed
			console.log(reason);
		});

		renderGraph();
	}
	// update category
	this.updateCategory = function(form){
		// update category
		graph.category = form.category;
		// render graph
		renderGraph();
	}
	// update start date
	this.updateStartDate = function(form){
		// update start date
		graph.startDate = form.startDate
		// render graph
		renderGraph();
	}
	// update end date
	this.updateEndDate = function(form){
		// update end date
		graph.endDate = form.endDate;
		// render graph
		renderGraph();
	}
	// get graph
	this.getGraph = function(){
		return graph;
	}
}]);
cfpApp.controller('todoCtrl', ['$scope', 'userService', 'activeFormService', function($scope, userService, activeFormService){
	// initialize todo
	$scope.todo = userService.getUser();
	// initialize todo form
	$scope.todoForm = angular.copy(userService.getUser());
	// initialize show todo list
	$scope.todoForm.display = false;
	// remove task
	$scope.removeTask = function(idx){
		// remove task
		userService.removeTask(idx);
	}
        // open form
        $scope.openTodoForm = function(){
	       // set todo form data
	       $scope.todoForm = angular.copy(userService.getUser());
	       // hide active form
	       activeFormService.activeForm.display = false;
	       // display user form
	       $scope.todoForm.display = true;
	       // set user form to active form
	       activeFormService.activeForm = $scope.todoForm;
       }
       // close form
       $scope.closeTodoForm = function(){
	       // hide edit user form
	       $scope.todoForm.display = false;
       }
}]);
cfpApp.controller('cfpCtrl', ['$scope', 'userService', function($scope, userService){
	// initialize user
	$scope.user = userService.getUser();
}]);
cfpApp.controller('graphCtrl', ['$scope', 'graphService', function($scope, graphService){
	// initialize graph
       	$scope.graph = graphService.getGraph();
	// initialize style
	$scope.graph.style = 'cfp-box col-md-10';
}]);
cfpApp.controller('surveyCtrl', ['$scope', 'surveyService', 'graphService', function($scope, surveyService, graphService){
	// initialize survey
	$scope.survey = angular.copy(surveyService.getSurvey());
	// initialize survey style
	$scope.survey.style = 'cfp-box col-md-2';
	// initialize survey show
	$scope.survey.isShowSurvey = false;
	// open survey
	$scope.openSurvey = function(){
		// reset survey
		$scope.survey = angular.copy(surveyService.getSurvey());
		// expand survey box
		$scope.survey.style = 'cfp-box col-md-6';
		// show survey content
		$scope.survey.isShowSurvey = true;
		// set survey as incomplete
		$scope.survey.complete = false;
		// set the survey question position
		$scope.survey.currIdx = 0;
		// set question
		$scope.survey.question = $scope.survey.questions[$scope.survey.currIdx];
		// contract graph
		graphService.getGraph().style = 'cfp-box col-md-6';
	}
	// close survey
	$scope.closeSurvey = function(){
		// contract survey box
		$scope.survey.style = 'cfp-box col-md-2';
		// hide survey content
		$scope.survey.isShowSurvey = false;
		// expand graph
		graphService.getGraph().style = 'cfp-box col-md-10';
	}
	// answer question
	$scope.answer = function(){
		surveyService.answer($scope.survey);
	}
}]);
cfpApp.service('surveyService', ['graphService', 'userService', 'socketService', function(graphService, userService, socketService){
	// initialize survey
	// TODO get survey questions
	survey = {};
	socketService.getSurveyData().then(function(data){
		// get survey questions
		survey.questions = data;
	}, function(reason){
		// failed to get questions
		console.log(reason);
	});
	this.answer = function(survey){
		// if answer is valid
		if (isValid(survey)){
			// get the next question
			survey.currIdx++;
			// if we finished the survey
			if (survey.currIdx == survey.questions.length){
				// process survey data
				processSurvey(survey);
				// make survey as complete
				survey.complete = true;
			}
			else {
				// update question
				survey.question = survey.questions[survey.currIdx];
			}
		}
	}
	function isValid(survey){
		// if survey is input
		if (survey.question.type == "input"){
			// if answer is not defined
			if (!survey.question.answer){
				survey.question.err = "Please enter an answer";
				return false;
			}
			// This regex checks that the string contains at least one character so it isn't empty and all of the charaters arre digits, thus
			// it is a vali dnumber.
			var re = new RegExp("^\\d+$");
			// if the input is not a valid number
			if (!re.test(survey.question.answer)){
				// input valid number
				survey.question.err = "Please enter a valid number";
				return false;
			}
		}
		return true;
	}
	function processSurvey(survey){
		// TODO process survey answer data
		// cfp by category
		cfp = {};
		// initalize total cfp
		cfp.total = 0;
		// initialize new tasks
		tasks = [];
		// iterate through each of the questions
		angular.forEach(survey.questions, function(question, idx){
			// if question is slider
			if (question.type == 'slider'){
				// get cfp impact
				question.cfpImpact = question.sliderData[question.answer].cfpVal;
			}
			// if question is text input
			if (question.type == 'input'){
				// get cfp impact
				question.cfpImpact = question.cfpFactor * parseFloat(question.answer);
			}
			// if question is radio
			if (question.type == 'radio'){
				// get cfp impact
				question.cfpImpact = question.radioData[question.answer].cfpVal;
			}
			// initialize category
			if (!cfp[question.category]){
				cfp[question.category] = 0.0;
			}
			// add cfpImpact to total cfp for category
			cfp[question.category] += question.cfpImpact;
			// add cfpImpact to total overall cfp
			cfp.total += question.cfpImpact;
			// push tasks
			tasks.push({name: question.suggestion, priority: question.cfpImpact});
		});
		// sort the tasks by priority
		tasks = tasks.sort(function(t1, t2){
			t2.priority - t1.priority;
		});
		// update user's tasks
		userService.updateTasks(tasks);
		// update user's cfp
		userService.updateCfp(cfp.total);
		// initialize list of datapoints
		dps = [];
		// create new date
		date = new Date().toISOString();
		// iterate through cfp values by category
		angular.forEach(cfp, function(cfpVal, category){
			var dp = {date: date, category: category, cfp: cfpVal};
			dps.push(dp);
		});
		// add data points to graph
		graphService.updateGraphData(dps);
	}
	// get survey
	this.getSurvey = function(){
		return survey;
	}
}]);
cfpApp.filter('upper', function(){
	return function(input){
		// convert input to string
		input = input || '';
		// return input with first letter capitalized
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	}
});
cfpApp.directive('graph', function($parse, $window){
   return{
      restrict:'EA',
       link: function(scope, elem, attrs){
				 var data;
				 	var margin = {top: 40, right: 40, bottom: 40, left:40};
				 	var width = 500;
				 	var height = 275;

					d3.select("svg").remove();


				 var svg = d3.select('graph').append('svg')
					 .attr('class', 'chart')
					 .attr('width', width)
					 .attr('height', height)
				 .append('g')
					 .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

				 	scope.$watchCollection(attrs.graphData, function(value){
						if (value){
							data = value;
							console.log("UPDATE");
							renderGraph();
						}
					});



function renderGraph(){

	var margin = {top: 40, right: 40, bottom: 40, left:40};
	var width = 500;
	var height = 300;
	d3.select("svg").remove();


 var svg = d3.select('graph').append('svg')
	 .attr('class', 'chart')
	 .attr('width', width)
	 .attr('height', height)
 .append('g')
	 .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	var x = d3.time.scale()
		.domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
		.rangeRound([0, width - margin.left - margin.right]);

	var y = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.cfp; })])
		.range([height - margin.top - margin.bottom, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom')
		.ticks(d3.time.days, 1)
		.tickFormat(d3.time.format('%a %d'))
		.tickSize(0)
		.tickPadding(8);

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left')
		.tickPadding(8);

svg.selectAll('.chart').data(data)
.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) {
		return x(new Date(d.date)); })
	.attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.cfp)) })
	.attr('width', 10)
	.attr('height', function(d) {
				return height - margin.top - margin.bottom - y(d.cfp) });

svg.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
	.call(xAxis);

svg.append('g')
.attr('class', 'y axis')
.call(yAxis);
       }
		 }
   };
});
