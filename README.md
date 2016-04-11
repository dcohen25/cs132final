REALTIME README
================

In this project, I updated my previous node.js chatroom application to include realtime functionality.  AJAX/interval code that was used to send and refresh messages was removed.  Sockets were instead used to handle this functionality.

When a user joins a room, they are prompted to enter a username.  The username is then validated by the server, in order to make sure that the name is not blank or does not currently exist in the active room.  If the name is not valid, the user is prompted to enter a new name.  Otherwise, the client sends a join emit to the server.  The new client is added to the member list, which is broadcasted to all connected client sockets.  The server then returns a list of messages to the new client.

When a user enters a new message, a message emit is sent to the server.  The server takes the new message, stores it in the SQL database, and then broadcasts it to all clients connected to the room.

In this project, users are allowed to chat their nicknames.  On the side bar of users, the name of the current user is printed at the top with an orange glyphicon next to them.  If the user clicks the glyphicon, they are prompted to enter a new username.  If the user cancels this prompt nothing happens.

Whenever a user enters or leaves the room, or changes their username, alerts are broadcasted to all clients.  These alerts appear as gray italicized text.  They are not stored in the SQL database... a new user will not see old alerts.  These alerts are targetted towards users currently in the chat.

The get/post handlers for creating a new room remained the same in this project.


Additional features:

- There is a little circle next to each user's name indicating whether they are active or idle. A user is active if the chatroom is their active browser window.  If the user does not have the chat window as their active window, they are displayed as idle.  Active users have a green circle near their name, and idle users have a yellow circle.

- Whenever a user starts typing, the other clients get notified.


Known bugs: none
