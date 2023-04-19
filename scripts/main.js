let websocket;

Hooks.on("init", async () => {
  game.settings.register("foundry-discord-chat", "serverIp", {
    name: "Discord Bot Server IP",
    hint: "Enter the IP address and port where the Discord bot is running (e.g., http://192.168.1.10:3000)",
    scope: "world",
    config: true,
    default: "",
    type: String,
  });

  const serverIp = game.settings.get("foundry-discord-chat", "serverIp");
  console.log(serverIp);
  if (serverIp) {
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
    })
  }
});

Hooks.on("chatMessage", async (log, message, chatData) => {
  game.socket.emit("module.foundry-discord-chat", { message: chatData.content });
});