const express = require("express");
const app = express();
const http = require("http").createServer(app);
const server = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const path = require("path");
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// handle a socket connection request from web client
const connectionStatus = [false, false];
server.on("connection", (socket) => {
  let playerIndex = -1;

  // find an available player number
  for (const i in connectionStatus) {
    if (connectionStatus[i] === false) {
      playerIndex = parseInt(i);
      break;
    }
  }

  // tell the connecting client what player number they are
  console.log(`Player ${playerIndex} has connected`);

  // assign player to the game
  if (playerIndex === 0) {
    socket.emit("player-1-connecting", connectionStatus[1]);
  } else if (playerIndex === 1) {
    socket.emit("player-2-connecting", connectionStatus[0]);
  } else {
    socket.emit("full-server");
  }

  // inform other players a player is connected
  socket.on("player-connected", (name) => {
    connectionStatus[playerIndex] = name;
    socket.broadcast.emit("player-has-joined", { playerIndex, name });
  });

  console.log({ connectionStatus });

  socket.on("update-grid", ({ grid, gameOver }) => {
    socket.broadcast.emit("update-grid", { grid, gameOver });
  });

  socket.on("update-result-display", ({ result, lastPlayer, numOfRounds }) => {
    console.log({ lastPlayer });
    socket.broadcast.emit("update-result-display", { result, lastPlayer, numOfRounds });
  });

  socket.on("update-score", ({ result, numOfRounds }) => {
    server.sockets.emit("update-score", { result, numOfRounds });
  });

  socket.on("replay-request", () => {
    socket.broadcast.emit("replay-request");
  });

  // handle disconnect
  socket.on("disconnect", () => {
    let name = connectionStatus[playerIndex];
    let num = playerIndex;
    socket.broadcast.emit("player-disconnected", { name, num });
    console.log(`Player ${playerIndex} has disconnected`);
    connectionStatus[playerIndex] = false;
    console.log({ connectionStatus });
  });
});
