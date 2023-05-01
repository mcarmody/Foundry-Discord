Hooks.once("init", async function () {
  console.log("Discord Chat | Initializing discord bot");

  // Add this line to start the API server
})

Hooks.once("ready", async function () {
  console.log("Ready!");

  // Emit a test message
  game.socket.emit("module.foundry-discord-chat", { operation: "testMessage", message: "Foundry VTT module is ready!" });

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
  });
});