let config;

Hooks.on("init", async () => {
  config = await game.packs.get("foundry-discord-chat.config").getContent();
  const serverIp = config[0].data.server_ip;

  game.socket.on("module.foundry-discord-chat", async (data) => {
    if (game.user.isGM) {
      try {
        await fetch(`${serverIp}/foundry-message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: data.message })
        });
      } catch (error) {
        console.error('Error sending message to Discord bot:', error);
      }
    }
  });
});

Hooks.on("chatMessage", async (log, message, chatData) => {
  game.socket.emit("module.foundry-discord-chat", { message: chatData.content });
});