const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 5000,

  discord: {
    applicationId: process.env.DISCORD_APPLICATION_ID,
    publicKey: process.env.DISCORD_PUBLIC_KEY,
    botToken: process.env.DISCORD_BOT_TOKEN,
  },
};

module.exports = env;