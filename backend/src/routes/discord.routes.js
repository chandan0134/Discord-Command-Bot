const express = require("express");

const discordController = require("../controllers/discord.controller");
const verifyDiscordSignature = require("../middleware/discordSignature.middleware");

const router = express.Router();

router.post(
  "/interactions",
  verifyDiscordSignature,
  discordController.handleInteraction
);

module.exports = router;