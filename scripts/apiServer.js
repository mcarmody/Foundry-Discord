const express = require("express");
const app = express();
const port = 3000; // Change this to any available port you want the API server to listen on

// Expose an API endpoint to search for characters by name
app.get("/api/characters", async (req, res) => {
  const characterName = req.query.name;

  if (!characterName) {
    res.status(400).send("Character name is required.");
    return;
  }

  try {
    // Search for the character in Foundry VTT using the Foundry API
    const characters = game.actors.filter((actor) => actor.data.type === "character" && actor.name.toLowerCase() === characterName.toLowerCase());

    if (characters.length > 0) {
      res.json(characters[0].data);
    } else {
      res.status(404).send("Character not found.");
    }
  } catch (error) {
    console.error("Error searching for character:", error);
    res.status(500).send("An error occurred while searching for the character.");
  }
});

app.listen(port, () => {
  console.log(`Foundry VTT API server listening at http://localhost:${port}`);
});