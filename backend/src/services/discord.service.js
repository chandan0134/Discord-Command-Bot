const axios = require("axios");

const env = require("../config/env");

const sendReportToChannel = async ({
  username,
  userId,
  reportText,
}) => {
  const url = `https://discord.com/api/v10/channels/${env.discord.reportChannelId}/messages`;

  const message = [
    "📢 **New Report**",
    "",
    `**User:** ${username || "Unknown"}`,
    `**User ID:** ${userId || "Unknown"}`,
    `**Report:** ${reportText || "No report text provided"}`,
  ].join("\n");

  await axios.post(
    url,
    {
      content: message,
    },
    {
      headers: {
        Authorization: `Bot ${env.discord.botToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

module.exports = {
  sendReportToChannel,
};