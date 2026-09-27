const axios = require("axios");

const env = require("../config/env");

const commands = [
  {
    name: "status",
    description: "Check the status of the Discord bot",
  },
  {
    name: "report",
    description: "Submit a report",
    options: [
      {
        name: "text",
        description: "Describe the issue or report",
        type: 3,
        required: true,
      },
    ],
  },
];

const registerCommands = async () => {
  try {
    const url = `https://discord.com/api/v10/applications/${env.discord.applicationId}/commands`;

    const response = await axios.put(
      url,
      commands,
      {
        headers: {
          Authorization: `Bot ${env.discord.botToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Discord commands registered successfully.");

    console.log(
      response.data.map((command) => ({
        id: command.id,
        name: command.name,
      }))
    );
  } catch (error) {
    console.error(
      "Failed to register Discord commands:",
      error.response?.data || error.message
    );
  }
};

registerCommands();