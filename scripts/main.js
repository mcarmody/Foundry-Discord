Hooks.once("init", async function () {
  console.log("your-module-name | Initializing your-module-name");

  // Add this line to start the API server
  require("./apiServer");
})

Hooks.on("chatMessage", async (log, message, chatData) => {
  game.socket.emit("module.foundry-discord-chat", { message: chatData.content });
});