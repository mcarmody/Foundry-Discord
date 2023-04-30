Hooks.once("init", async function () {
  console.log("Discord Chat | Initializing discord bot");

  // Add this line to start the API server
  require("./apiServer");
})

Hooks.once("ready", async function () {
  // Other ready hook code ...

  // Set up a custom socket event for fetching character data
  game.socket.on("module.your-module-name", async (data, callback) => {
    if (data.operation === "fetchCharacterData") {
      const characterName = data.characterName;

      // Search for the character in Foundry VTT using the Foundry API
      const characters = game.actors.filter((actor) => actor.data.type === "character" && actor.name.toLowerCase() === characterName.toLowerCase());

      if (characters.length > 0) {
        callback(characters[0].data);
      } else {
        callback(null);
      }
    }
  });
});

Hooks.on("chatMessage", async (log, message, chatData) => {
  game.socket.emit("module.foundry-discord-chat", { message: chatData.content });
});