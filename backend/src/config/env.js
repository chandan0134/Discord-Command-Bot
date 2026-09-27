const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 5000,

   frontendUrl: process.env.FRONTEND_URL,

  discord: {
    applicationId: process.env.DISCORD_APPLICATION_ID,
    publicKey: process.env.DISCORD_PUBLIC_KEY,
    botToken: process.env.DISCORD_BOT_TOKEN,
      reportChannelId: process.env.BOT_REPORT_CHANNEL_ID,
  },

  mongodb: {
    uri: process.env.MONGODB_URI,
  },

   admin: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
  },
};

module.exports = env;