var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const games = {}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("newGame", user => {
    // Make sure the user isn't in any other rooms
    disconnectUser(socket, user);
 
    // generate random 6 alpha numeric string
    var name = Math.random().toString(36).substr(2, 5);
   
    // make sure it is unique
    while (games.hasOwnProperty(name)) {
      name = Math.random().toString(36).substr(2, 5);
    }

    // create the game
    games[name] = {
      id: name,
      users: [socket.id],
      guess: "",
      turn: '1'
     };

    // Have user join room
    socket.join(name);

    console.log(games)

    // tell the player the room
    io.to(name).emit('new', {
      name: name,
      message: "Send the code " + name + " to someone to start the game!",
      players: 1
      });
  });

  // Called when a user joins a game
  socket.on('join', function(user) {
    // Make sure the provided game is actually a game
    if (games[user["code"]]) {
      // Only allow 2 players in a room
      if (games[user["code"]].users.length < 2) {
        // Make sure the same user isn't trying to join the room twice
        if (games[user["code"]].users.indexOf(socket.id) < 0) {
          // Join the room
          socket.join(user["code"]);
          // Update the user list
          games[user["code"]].users.push((socket.id));
          // Update the turn
          games[user["code"]].turn = games[user["code"]].users[Math.floor(Math.random() * 2)];
          // Let everyone know the game board
          io.to(user["code"]).emit('start', {
            name: user["code"],
            board: games[user["code"]].board,
            players: 2,
            turn: games[user["code"]].turn,
            message: "The game has started!",
            color: 'red'}
          );
          console.log(games)
        }
      } else {
        // Game is full
        socket.join('game-full-room');
        io.to('game-full-room').emit('room full', {message: "Sorry, this room is full"});
      }
    } else {
      // Invalid game
      socket.join('invalid-game-id-room');
      io.to('invalid-game-id-room').emit('invalid game id', {message: "That game ID does not exist"});
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// Called when the user disconnects from server or starts a new room
function disconnectUser(socket, user) {
  // Find what game they are in
  for (game in games) {
    var index = games[game].users.indexOf(socket.id);
    if (index > -1) {
      // Remove them from the players list
      games[game].users.splice(index, 1);
      // Remove the game if there are no users
      if (games[game].users.length == 0)
        delete games[game];
      else {
        // Want to let the user know someone disconnected and tell them to send the code again
        io.to(game).emit('new', {name: game, board: games[game].board, players: 1,
          message: '<h3>A user has disconnected. Either start a new game, or give them this ID, <mark>'
          + game + '</mark>, to continue</h3>'})
      }
    }
  }
}