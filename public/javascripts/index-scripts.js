// Get socket
// var socket = io.connect();
// On loading the pgae, set up event handlers
$(window).load(function() {
	var update = $('#update');
	var goals = $('#goals');
	var cfp = $('#cfp');
	var goal = $('#goal');
	var updateBtn = $('#update-btn');
	var updateBox = $('#update-box');
	var updateHeader = $('#update-header');
	var goalsClose = $('#goals-close');
	var updateClose = $('#update-close');
	// click update cfp button
	updateBtn.on('click', function() {
		if (goals.is(':visible')){
			update.attr('class', 'main col-md-4');
			cfp.attr('class', 'main col-md-4');
			goals.attr('class', 'main col-md-4');
		}
		else {
			update.attr('class', 'main col-md-6');
			cfp.attr('class', 'main col-md-6');
		}
		updateHeader.hide();
		updateBox.show();
	});
	// Click goal
	goal.on('click', function() {
		if (updateBox.is(':visible')){
			update.attr('class', 'main col-md-4');
			cfp.attr('class', 'main col-md-4');
			goals.attr('class', 'main col-md-4');
		}
		else {
			goals.attr('class', 'main col-md-5');
			cfp.attr('class', 'main col-md-5');
		}
		goals.show();
	});
	// close the goals section
	goalsClose.on('click', function() {
		if (updateBox.is(':visible')){
			update.attr('class', 'main col-md-6');
			cfp.attr('class', 'main col-md-6');
		}
		else {
			cfp.attr('class', 'main col-md-10');
		}
		goals.hide();
	});
	// close the update section
	updateClose.on('click', function() {
		if (goals.is(':visible')){
			goals.attr('class', 'main col-md-5');
			cfp.attr('class', 'main col-md-5');
		}
		else {
			cfp.attr('class', 'main col-md-10');
		}
		update.attr('class', 'main col-md-2');
		updateBox.hide();
		updateHeader.show();
	});
	// If the body element was clicked
	$('body').on('click', function (e){ 
		// Check if the element you clicked on is equal to the user keyword
		var user = $('#user');
		var editUser = $('#edit-user');
		// if the target you clicked on is not equal to the user keyword or edit usre div or any element inside the edit user form
		if (!user.is(e.target) && !editUser.is(e.target) && editUser.has(e.target).length == 0){
			// hide the form
		}
		else if (user.is(e.target)){
			// clicked keyword, so show the form
		}
		// Check if the elemnt you clicked on is equal to the cfp category keyword
		var cfpCat = $('#cfp-cat');
		var editCfpCat = $('#edit-cfp-cat');
		// if the target you clicked on is not equal to the cfp keyword or the edit cfp div or any element inside the edit cfp form
		if (!cfpCat.is(e.target) && !editCfpCat.is(e.target) && editCfpCat.has(e.target).length == 0){
			// hide the form
		}
		else if (cfpCat.is(e.target)){
			// clicked keyword, so show the form
			editCfpCat.show();
		}
		// Check if the element you clicked on is equal to the start date keyword
		var startDate = $('#start-date');
		var editStartDate = $('#edit-start-date');
		// if the target you clicked on is not equal to the start date keyword
		if (!startDate.is(e.target) && !editStartDate.is(e.target) && editStartDate.has(e.target).length == 0){
			// reset the start date form
			editStartDate[0].reset();
			// hide the form
			editStartDate.hide();
		}
		else if (startDate.is(e.target)){
			//clicked keyword, so show the form
			editStartDate.show();
		}
		// Check if the element you clicked on is equal to the end date keyword
		var endDate = $('#end-date');
		var editEndDate = $('#edit-end-date');
		// if the target you clicked on is not equal to the end date keyword
		if (!endDate.is(e.target) && !editEndDate.is(e.target) && editEndDate.has(e.target).length == 0) {
			// reset the end date form
			editEndDate[0].reset();
			// hide the form
			editEndDate.hide();
		}
		else if (endDate.is(e.target)){
			// clicked keyword, so show the form
			editEndDate.show();
		}
	});
});
/*
// update user credentials
function updateUserCredentials(e){
	e.preventDefault();
	// get user credentials
	var email = $('#email').val();
	var password = $('#password').val();
	var firstName = $('#firstname').val();
	var lastName = $('#lastname').val();
	// if credentials are valid
	if (isValidUserCredentials(email, password, firstName, lastName)){
		// update user credentials in database
	}
}
function isValidUserCredentials(email, password, firstName, lastName){
	var isValid = true;
	// if the email is invalid
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	if (!email || !email.trim() || !pattern.test(email)){
		isValid = false;
		$('#email-err').text('Email is invalid.');
	}
	else {
		// email is valid
		$('#email-err').text('');
	}
	// if password is empty
	if (!password || !password.trim()){
		isValid = false;
		$('#password-err').text('Password cannot be blank');
	}
	else {
		// password is valid
		$('#password-err').text('');
	}
	// if the first name is empty
	if (!firstName || !firstName.trim()){
		isValid = false;
		$('#firstname-err').text('First name cannot be blank.');
	}
	else {
		// first name is valid
		$('#firstname-err').text('');
	}
	// if the last name is empty
	if (!lastName || !lastName.trim()){
		isValid = false;
		$('#lastname-err').text('Last name cannot be blank.');
	}
	else {
		// last name is valid
		$('#lastname-err').text('');
	}
	return isValid;
}
// socket events */
