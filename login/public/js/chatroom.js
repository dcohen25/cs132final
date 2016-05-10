// Get socket
var socket = io.connect();
// On loading the page, set up event handlers
window.addEventListener('load', function(){
	// check if an error occured upon loading page
	var err = document.getElementById('error');
	if (err.innerHTML){
		// an error occured, so display error
		showPopup('error');
	}
	// check if room requested upon loading page
	var room = document.getElementById('room');
	if (room.value){
		// room requested, so display signin
		showPopup('sign-in');
	}	
	// listen for client submitting a message to the chatroom
	var msgForm = document.getElementById('msgForm');
	msgForm.addEventListener('submit', sendMessage, false);
	// get active rooms on the server 
	var rooms = document.getElementById('rooms');
	getRooms(rooms);
	// get signin form and add event listener
	var signinForm = document.getElementById('sign-in');
	signinForm.addEventListener('submit', signin, false);
	// close popup
	var close = document.getElementById('close');
	close.addEventListener('click', hidePopup, false);
	// create room 
	var createRm = document.getElementById('createRoom');
	createRm.addEventListener('submit', createRoom, 'false');
	// user message input
	var msgInput = document.getElementById('messageId');
	// listen for a change in the contents of the input field
	// and call changeInput() when input contents change
	msgInput.addEventListener('input', changeInput, 'false');
}, false);
// socket events
// client recieves a typing event from typing user
socket.on('type', function(user){
     	// get user's typing notification panel
	var isTyping = document.getElementById(user + '-type-display');
	// display typing notification
	isTyping.className = 'show type-display';
});
// client recieves a no typing event from user
socket.on('no-type', function(user){
	// get user's typing notification
	var isTyping = document.getElementById(user + '-type-display');
	// hide typing notification
	isTyping.className = 'hide type-display';
});
// client recieves a message sent from chatroom
socket.on('message', function(nickname, message, time){
	// add message to the chat
	var chat = document.getElementById('msgs');
	var msg = document.createElement('li');
	msg.className = 'msg';	
	msg.innerHTML = "<div class='msg-body c3'>" + message + "</div>" + 
	"<div class='msg-info left'>" + nickname + "</div>";
	var time = new Date(time);	
	msg.innerHTML += "<div class='msg-info right'>" + time.toLocaleString() + "</div>";
	chat.appendChild(msg);
});
// user leaves room
socket.on('leave', function(nickName){
	// get the user list
	var users = document.getElementById('users');	
	// get the user in the user's list
	var usr = document.getElementById(nickName);
	// remove the user from the user's list
	users.removeChild(usr);
});	
// user joins room
socket.on('join', function(nickName){
	// get the user's list
	var users = document.getElementById('users');
	// create a new user
	var usr = document.createElement('li');
	usr.id = nickName;
	usr.className = 'user c2';
	var title = document.createElement('h3');
        title.innerHTML	= nickName;
	var typeDisplay = document.createElement('h6');
	typeDisplay.id = nickName + '-type-display';
	typeDisplay.className = 'hide';
	typeDisplay.innerHTML = nickName + ' is typing...';
	usr.appendChild(title);
	usr.appendChild(typeDisplay);
	// add user to the user's list
	users.appendChild(usr);
});
// user creates room
socket.on('create', function(roomName){
	// get the room's list
	var rooms = document.getElementById('rooms');
	// create a new room
	var room = document.createElement('li');
	room.id = roomName;
	room.className = 'room c2';
	room.innerHTML = '<h3>' + roomName + '</h3>';
	room.addEventListener('click', function(){
		// set new room
		document.getElementById('room').value = this.id;
		// show signin
		showPopup('sign-in');
	});
	// Add the room
	rooms.appendChild(room);
});
// change message input
function changeInput(){
	// if input is nonempty
	if (this.value){
		// send type event to the server
		socket.emit('type');
	}
	else {
		// send no type event to the server
		socket.emit('no-type');
	}
}
// create room
function createRoom(e){
	e.preventDefault();
	// send request to create room to server
	socket.emit('create', function(err, room){
		// if an error occured
		if (err){
			// display error
			var error = document.getElementById('error');
			error.innerHTML= err;
			showPopup('error');
		}
		else {
			// set new room
			document.getElementById('room').value = room;
			// show signin
			showPopup('sign-in');
		}
	});
}
//sign in to chat room
function signin(e){
	e.preventDefault();
	var userId = document.getElementById('userId').value;
	var room = document.getElementById('room').value;
	// Sign in
	socket.emit('signin', userId, room, function(err){
		// If an error occured
		if (err){
			// Set error panel to display message
			var signinErr = document.getElementById('signin-error');
			signinErr.innerHTML = err;
			signinErr.className = 'show';
		}
		else {
			// hide the popup
			hidePopup();
			// Join the chat
			join(room, userId);
		}
	});
}
// join the chatroom
function join(room, userId){
	// leave current chatroom, if exists
	socket.emit('leave');	
	// join the chat at the new room with specified userId
	socket.emit('join', room, userId, function(err, users, messages){
		//If an error occured
		if (err){
			document.getElementById('error').innerHTML = err;
			showPopup('error');
		}
		else {
			// join chat	
			document.getElementById('room-header').innerHTML = 'Room: ' + room;
			// enable message input
			document.getElementById('messageId').disabled = false;
			document.getElementById('msgSend').disabled = false;	
			// Add users and messages
			var usersList = document.getElementById('users');
			// Clear user list
			while (usersList.hasChildNodes()){
				usersList.removeChild(usersList.firstChild);
			}
			// Add new users
			for (i = 0; i < users.length; i++){
				var user = document.createElement('li');
				user.id = users[i];
				user.className = 'user c2';
				var title = document.createElement('h3');
				title.innerHTML = users[i];
				var typeDisplay = document.createElement('h6');
				typeDisplay.id = users[i] + '-type-display';
				typeDisplay.className = 'hide';
				typeDisplay.innerHTML = users[i] + ' is typing...';		
				user.appendChild(title);
				user.appendChild(typeDisplay);
				usersList.appendChild(user);
			}
			var chatList = document.getElementById('msgs');
			chatList.className = 'c2';	
			// Clear chat list
			while (chatList.hasChildNodes()){
				chatList.removeChild(chatList.firstChild);
			}
			// Add new messages
			for (i = 0; i < messages.length; i++){
				var msg = document.createElement('li');
				msg.className = 'msg';	
				msg.innerHTML = "<div class='msg-body c3'>" + messages[i].body + "</div>" + 
					"<div class='msg-info left'>" + messages[i].nickname + "</div>";
			       	var time = new Date(messages[i].time);	
				msg.innerHTML += "<div class='msg-info right'>" + time.toLocaleString() + "</div>";
				chatList.appendChild(msg);
			}
		}
	});
}
// get rooms on the server
function getRooms(rooms){
	// send a request for the active rooms
	socket.emit('rooms', function(err, res){
		// if an error occured
		if (err){
			// set the error message
			var errMsg = document.getElementById('errMsg');
			errMsg.innerHTML = err;
			// display the popup
			showPopup('error');
		}
		else {	
			// add new recent rooms to empty list
			for (i = 0; i < res.length; i++){
				var room = document.createElement('li');
				room.id = res[i];
				room.className = 'room c2';	
				room.innerHTML = "<h3>" + res[i] + "</h3>";
				// user clicks on room
				room.addEventListener('click', function(){
					// set new room
					document.getElementById('room').value = this.id;
					// show signin
					showPopup('sign-in');
				}, false);
				rooms.appendChild(room);
			}
		}
	});
}
// send client message to the chatroom on the server
function sendMessage(e){
	// prevent the page from redirecting
	e.preventDefault();
	// get the message to be sent to the chatroom server
	var message = document.getElementById('messageId').value;
	// post client message to chatroom in which the message was sent
	socket.emit('message', message, function(err){
		// if an error occured	
		if (err){
			// set error message
			document.getElementById('error').innerHTML = err;
			// show error
			showPopup('error');	
		}
		else {
			// message sent succesfully, clear message field
			document.getElementById('messageId').value = '';
			// send a no-type event
			socket.emit('no-type');
		}
	});	
}
//show popup
var popup;
function showPopup(panel){
	popup = panel
	var header = document.getElementById('popup-header');
	if (panel == 'sign-in'){
		header.innerHTML = 'Sign into chatroom ' + document.getElementById('room').value;		
	}
	else if (panel == 'error'){
		header.innerHTML = 'Error';
	}
	// display the popup
	document.getElementById(panel).className = 'show popup-content';
	document.getElementById('popup-wrapper').className = 'show';
}
// hide popup
function hidePopup(){
	// clear the header
	document.getElementById('popup-header').innerHTML = '';
	// check panels
	if (popup == 'sign-in'){
		// clear input
		document.getElementById('userId').value = '';
		// hide signin error	
		document.getElementById('signin-error').className = 'hide';
	}
	else if (popup == 'error'){
		document.getElementById('error').innerHTML = '';
	}
	// hide the panel
	document.getElementById(popup).className = 'hide popup-content';
	// hide the popup
	document.getElementById('popup-wrapper').className = 'hide';
}
