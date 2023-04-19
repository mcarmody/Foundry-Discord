let config;
let websocket;

Hooks.on("init", async () => {
  config = await game.packs.get("foundry-discord-chat.config").getContent();
  const serverIp = config[0].data.server_ip;
  websocket = new WebSocket(`${serverIp.replace('http', 'ws')}`);

  websocket.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  game.socket.on("module.foundry-discord-chat", async (data) => {
      try {
        websocket.send(JSON.stringify({ message: data.message }));
      } catch (error) {
        console.error('Error sending message to Discord bot:', error);
      }
  });
});

Hooks.on("chatMessage", async (log, message, chatData) => {
  game.socket.emit("module.foundry-discord-chat", { message: chatData.content });
});