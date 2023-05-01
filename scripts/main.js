// const io = require("socket.io")(game.server);

// io.on("connection", (socket) => {
//   console.log("Socket.IO client connected:", socket.id);

//   socket.on("module.foundry-discord-chat", (data) => {
//     console.log("Received event in Foundry VTT module:", data);

//     if (data.operation === "rollTest") {
//       // Log the test in Foundry VTT or perform any other action
//       console.log("Test rolled:", data.test);
//     }
//   });
// });

Hooks.once("init", async function () {
  console.log("Discord Chat | Initializing discord bot");

  // Add this line to start the API server
})

Hooks.once("ready", async function () {
  console.log("Ready!");
  // Set up a custom socket event for fetching character data
  game.socket.on("module.foundry-discord-chat", async (data, callback) => {
    console.log("Received request in Foundry VTT module:", data);
    if (data.operation === "fetchCharacterData") {
      const characterName = data.characterName;

      // Search for the character in Foundry VTT using the Foundry API
      const characters = game.actors.filter((actor) => actor.data.type === "character" && actor.name.toLowerCase() === characterName.toLowerCase());

      if (characters.length > 0) {
        console.log("Found character in Foundry VTT:", characters[0].data);
        callback(characters[0].data);
      } else {
        console.log("Character not found in Foundry VTT");
        callback(null);
      }
    }

    if (data.operation === "rollTest") {
      // Log the test in Foundry VTT or perform any other action.
      console.log("Test rolled:", data.test);
    }
  });

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

  game.socket.on("module.foundry-discord-chat", async (data, callback) => {
    console.log("Received request in Foundry VTT module:", data);

    // Process the command based on the 'operation' value
    if (data.operation === "rollTest") {
      console.log("Command received from Discord bot:", data.message);
      // Process the command here
    } else {
      console.log("Unknown operation:", data.operation);
    }
  });
});;
