Hooks.on("init", () => {
  game.socket.on("module.foundry-discord-chat", async (data) => {
    if (game.user.isGM) {
      try {
        await fetch('http://your_server_ip:3000/foundry-message', {
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