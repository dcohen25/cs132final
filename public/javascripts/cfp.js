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
					reject(err.message);
				}
				else {
					// updated user credentials
					resolve("Succesfully updated user credentials!");
				}
			});
		});
	}
});
cfpApp.service('activeFormService', function (){
	// initialize active form
	this.activeForm = {};
}]);
cfpApp.controller('userCtrl', ['$scope', 'userService' 'activeFormService', function ($scope, userService, activeFormService){
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
cfpApp.service('userService', function (){
	// initialize user	
	user = {};
	// populate user from database
	user.id = "id1";
	user.email = 'test email';
	user.firstName = 'test first name';
	user.lastName = 'test last name';
	user.cfp = 56.0;
	user.tasks = [{name: "Task 1",
		priority: 12.0},
		{name: "Task 2",
		priority: 15.0},
		{name: "Task 3",
		priority: 99.0}
	];
	// update the user with input values
	this.updateUserCredentials = function(form){
		// if input credentials are valid
		if (isValidCredentials(form)){
			// update user credentials
			var promise = socketService.updateUserCredentials(form);
			promise.then(function(successMsg){
				// if user credentials updated succesfully
				form.statusMsg = successMsg;
				// update user credentials
				user.email = form.email.trim();
				user.firstName = form.firstName.trim(); 
				user.lastName = form.lastName.trim();
			}, function(reason){
				// user update failed
				form.statusMsg = reason;
			});
		}
	}
	// validate user input
	isValidCredentials = function(form){
		// isValid
		var isValid = true;	
		// validate email input
		if (!form.email ||!form.email.trim()){
			form.emailErr = 'Email cannot be blank.';
			isValid = false;
		}
		else {
			// email is valid
			form.emailErr = '';
		}
		// validate password input
		if (!form.password || !form.password.trim()){
			form.passwordErr = 'Password cannot be blank.';
			isValid = false;
		}
		else {
			// password is valid
			form.passwordErr = '';
		}
		// validate first name input
		if (!form.firstName || !form.firstName.trim()){
			form.firstNameErr = 'First name cannot be blank.';
			isValid = false;
		}
		else {
			// first name is valid
			form.firstNameErr = '';
		}
		// validate last name input
		if (!form.lastName || !form.lastName.trim()){
			form.lastNameErr = 'Last name cannot be blank.';
			isValid = false;
		}
		else {
			// last name is valid
			form.lastNameErr = '';
		}
		return isValid;
	}
	// get the user
	this.getUser = function(){
		return user;
	}
	// remove tasks
	this.removeTasks = function(form){
		// new tasks
		user.tasks = [];
		// new selected tasks
		selectedTasks = [];
		// iterate through selected tasks
		angular.forEach(form.selectedTasks, function(isSelected, idx){
			// if the task is not selected
			if (!isSelected){
				// add the task to new tasks
				user.tasks.push(form.tasks[idx]);
				selectedTasks.push(false);
			}
		});
		// set form tasks to new tasks
		form.tasks = user.tasks;
		// set form selected tasks
		form.selectedTasks = selectedTasks;
		// TODO update tasks in server
	}
	this.updateTasks = function(tasks){
		// update user tasks
		user.tasks = tasks;
		// TODO update tasks in server
	}
	// update cfp
	this.updateCfp = function(cfp){
		// update user cfp
		user.cfp = cfp;
		// TODO update cfp in server
	}
});
cfpApp.controller('cfpCatCtrl', ['$scope', 'graphService', 'activeFormService' function($scope, graphService, activeFormService){
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
cfpApp.controller('cfpStartDateCtrl', ['$scope', 'graphService', 'activeFormService' function($scope, graphService, activeFormService) {
	// initialize the date object
	$scope.cfpStartDate = graphService.getGraph();
	// initalize the input date form
	$scope.cfpStartDateForm = angular.copy(graphService.getGraph());
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
cfpApp.controller('cfpEndDateCtrl', ['$scope', 'graphService', 'activeFormService' function($scope, graphService, activeFormService) {
	// initialize the date object
	$scope.cfpEndDate = graphService.getGraph();
	// initalize the input date form
	$scope.cfpEndDateForm = angular.copy(graphService.getGraph());
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
cfpApp.service('graphService', function() {
	//initialize graph
	graph = {};
	// TODO get unique dates from graph data
	graph.dates = [];
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	graph.dates.push(new Date());
	// TODO get unique categories from graph data
	graph.categories = [];
	graph.categories.push('c1'); 
	graph.categories.push('c2'); 
	graph.categories.push('c3'); 
	graph.categories.push('c4'); 
	graph.categories.push('c5'); 
	// if there are dates, choose newest and oldest date
	if (graph.dates.length != 0){
		graph.startDate = graph.dates[0];
		graph.endDate = graph.dates[graph.dates.length - 1];
	}
	// if there are categories, choose first category
	if (graph.categories.length != 0){
		graph.category = graph.categories[0];
	}
	// initialize graph data
	graph.data = [];
	// TODO get graph data for current category, start date and end date from server
	graph.data.push({category: 'c1', date: new Date(), cfp: 56});
	graph.data.push({category: 'c1', date: new Date(), cfp: 57});
	graph.data.push({category: 'c1', date: new Date(), cfp: 58});
	graph.data.push({category: 'c1', date: new Date(), cfp: 59});
	graph.data.push({category: 'c1', date: new Date(), cfp: 60});
	graph.data.push({category: 'c1', date: new Date(), cfp: 61});
	graph.data.push({category: 'c1', date: new Date(), cfp: 62});
	// update the graph data
	this.updateGraph = function(){
		// TODO update graph data given start date, end date, and category
	}
	// add graph data, array of datapoints
	this.addData = function (data){
		// TODO adds the data to the graph
		// This includes adding new date and/or category to list of categories
		// This includes adding data points to data in database
	}
	// update category
	this.updateCategory = function(form){
		// update category
		graph.category = form.category;
	}
	// update start date
	this.updateStartDate = function(form){
		// update start date
		graph.startDate = form.startDate;
	}
	// update end date
	this.updateEndDate = function(form){
		// update end date
		graph.endDate = form.endDate;
	}
	// get graph 
	this.getGraph = function(){
		return graph;
	}
});
cfpApp.controller('todoCtrl', ['$scope', 'userService', 'activeFormService' function($scope, userService, activeFormService){
	// initialize todo
	$scope.todo = userService.getUser();	
	// initialize todo form
	$scope.todoForm = angular.copy(userService.getUser());
	// initialize show todo list
	$scope.todoForm.display = false;
	// remove tasks
	$scope.removeTasks = function(){
		userService.removeTasks($scope.todoForm);
	}
        // open form
        $scope.openTodoForm = function(){
	       // set todo form data
	       $scope.todoForm = angular.copy(userService.getUser());
	       // initialize selected tasks
	       $scope.todoForm.selectedTasks = [];
	       for (var i = 0; i < $scope.todoForm.tasks.length; i++){
	       	       $scope.todoForm.selectedTasks.push(false);
	       }
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
		// set the survey question	
		$scope.survey.currIdx = 0;
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
cfpApp.service('surveyService', ['graphService', 'userService', function(graphService, userService){
	// initialize survey
	// TODO get survey questions
	survey = {};
	survey.questions = [];
	survey.questions.push({question: "What is your favorite color asdfafdsafdsadfsadfadsfdsafsafddsafa",
		type: "Slider",
		category: "c1",
		options: [{name: 'option1',
			cfpVal: 56.0},
		{name: 'option2',
			cfpVal: 57.0},
		{name: 'option3',
			cfpVal: 58.0},
		{name: 'option4',
			cfpVal: 59.0},
		{name: 'option5',
			cfpVal: 60.0}
		],
		suggestion: "Choose a better color.",
		answer: 50
	});
	survey.questions.push({question: "How frequently do you eat red meat?",
		type: "Slider",
		category: "c1",
		options: [{name: 'Never',
			cfpVal: 56.0},
		{name: 'Very rarely',
			cfpVal: 57.0},
		{name: 'Occasionally',
			cfpVal: 58.0},
		{name: 'Frequently',
			cfpVal: 59.0},
		{name: 'Very Frequently',
			cfpVal: 60.0}
		],
		suggestion: "Try to reduce the amount of red meat you consume.",
		answer : 50
	});
	this.answer = function(survey){
		// get the next question
		survey.currIdx++;
		// if we finished the survey
		if (survey.currIdx == survey.questions.length){
			// process survey data
			processSurvey(survey);
			// make survey as complete
			survey.complete = true;
		}
	}
	processSurvey = function(survey){
		// TODO process survey answer data
		// cfp by category
		cfp = {};
		// initalize total cfp
		cfp.total = 0;
		// initialize new tasks
		tasks = [];
		// iterate through each of the questions
		angular.forEach(survey.questions, function(question, idx){
			// get cfp impact
			question.cfpImpact = question.options[question.answer / 25].cfpVal;
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
		// update user's tasks
		userService.updateTasks(tasks);
		// update user's cfp
		userService.updateCfp(cfp.total);
		// initialize list of datapoints
		dps = [];
		// create new date
		date = new Date();
		// get user
		user = userService.getUser();
		// iterate through cfp values by category
		angular.forEach(cfp, function(cfpVal, category){
			var dp = {userId: user.Id, date: date, category: category, cfp: cfpVal};
			dps.push(dp);
		});
		// add data points to graph
		// graphService.addDatapoints(dps);
	}
	// get survey
	this.getSurvey = function(){
		return survey;
	}
}]);

