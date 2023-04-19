Hooks.on("chatMessage", async (log, message, chatData) => {
  game.socket.emit("module.foundry-discord-chat", { message: chatData.content });
});