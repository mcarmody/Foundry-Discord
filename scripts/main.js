const express = require('express');
const { Server } = require('ws');

// Create the Express app and WebSocket server
const app = express();
const server = require('http').createServer(app);
const wss = new Server({ server });

// Listen for WebSocket connections
wss.on('connection', (ws) => {
  console.log('Discord bot connected to WebSocket.');

  // Listen for messages from the Discord bot
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Received command from Discord bot:', data.command);

    // Process the command here
  });

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('Discord bot disconnected from WebSocket.');
  });
});

// Start the Express server and WebSocket on a specific port
const port = 3000;
server.listen(port, () => {
  console.log(`WebSocket server listening on port ${port}`);
});

Hooks.once("init", async function () {
  console.log("Discord Chat | Initializing discord bot");

  // Add this line to start the API server
})

Hooks.once("ready", async function () {
  console.log("Ready!");

  // Emit a test message
  game.socket.emit("module.foundry-discord-chat", { operation: "testMessage", message: "Foundry VTT module is ready!" });

   // Replace 'folderName' with the name of the folder containing characters
  const folderName = "Norsemen";
  const folder = game.folders.find((f) => f.data.type === "Actor" && f.name === folderName);

  if (folder) {
    const characters = folder.content.filter((actor) => actor.data.type === "character");
    console.log("Emitting characters: "+characters);
    game.socket.emit("module.foundry-discord-chat", { operation: "characterList", characters: characters.map((c) => c.data) });
  }

  // game.socket.on("module.discord-test", (data) => {
  //   console.log("Received test request from discord");
  // });
});
