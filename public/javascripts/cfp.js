var mainApp = angular.module('mainApp', ['userApp']);
var userApp = angular.module('userApp', []);
userApp.controller('userCtrl', ['$scope', 'userService', function ($scope, userService){
	// initialize user input to be a copy of user data
       $scope.input = angular.copy(userService.user);
       // initialize user data
       $scope.user = userService.user;
       // initialize user input error
       $scope.err = userService.err;
       // initialize isEditUser
       $scope.isEditUser = false;
       // update user data
       $scope.updateUser = function(){
	       // update user data with user input
	       userService.updateUser($scope.input);
       }
       // cancel the update
       $scope.cancel = function(){
	       // restore the user input to current user data
	       $scope.input = angular.copy(userService.user);
	       // reset the error values
	       userService.resetError();
	       // hide edit user form
	       $scope.isEditUser = false;
       }
}]);
userApp.factory('userService', function (){
	// initialize user	
	user = {};
	// populate user from database
	user.email = 'test email';
	user.password = 'test password';
	user.firstName = 'test first name';
	user.lastName = 'test last name';
	// initialize user input error
	err = {};
	// cancel the input request
	function resetError(){
		err.email = '';
		err.password = '';
		err.firstName = '';
		err.lastName = '';
	}
	// update the user with input values
	function updateUser(input){
		// if user input is valid
		if (isValid(input)){
			// update user data
			user.email = input.email;
			user.password = input.password;
			user.firstName = input.firstName;
			user.lastName = input.lastName;
			// persist user data to database
			// if an error occures persisting, forawrd error to controller
		}
	}
	// validate user input
	function isValid(input){
		// isValid
		var isValid = true;	
		// validate email input
		if (!input.email || !input.email.trim()){
			err.email = 'Email cannot be blank.';
			isValid = false;
		}
		else {
			// email is valid
			err.email = '';
		}
		// validate password input
		if (!input.password || !input.password.trim()){
			err.password = 'Password cannot be blank.';
			isValid = false;
		}
		else {
			// password is valid
			err.password = '';
		}
		// validate first name input
		if (!input.firstName || !input.firstName.trim()){
			err.firstName = 'First name cannot be blank.';
			isValid = false;
		}
		else {
			// first name is valid
			err.firstName = '';
		}
		// validate last name input
		if (!input.lastName || !input.lastName.trim()){
			err.lastName = 'Last name cannot be blank.';
			isValid = false;
		}
		else {
			// last name is valid
			err.lastName = '';
		}
		return isValid;
	}
	return {
		user: user,
		err: err,
		resetError: resetError,
		updateUser: updateUser
	}
});
		
	

 
