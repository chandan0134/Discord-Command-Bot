const Interaction = require("../models/interaction.model");
const discordService = require("./discord.service");

const processInteraction = async (interaction) => {
  // Discord PING
  if (interaction.type === 1) {
    return {
      type: 1,
    };
  }

  // Only process slash commands
  if (interaction.type !== 2) {
    return {
      type: 4,
      data: {
        content: "Unsupported interaction type.",
        flags: 64,
      },
    };
  }

  const commandName = interaction.data?.name;

  const user =
    interaction.member?.user ||
    interaction.user ||
    {};

  const discordUserId = user.id || null;
  const username = user.username || null;

  let inputText = null;

  if (commandName === "report") {
    const textOption = interaction.data?.options?.find(
      (option) => option.name === "text"
    );

    inputText = textOption?.value || null;
  }

  // Save interaction to MongoDB
  const interactionRecord = new Interaction({
    discordInteractionId: interaction.id,
    type: interaction.type,
    commandName,
    discordUserId,
    username,
    inputText,
    status: "success",
  });

try {
  await interactionRecord.save();
} catch (error) {
  // MongoDB duplicate key = interaction was already processed
  if (error.code === 11000) {
    return {
      type: 4,
      data: {
        content: "This interaction has already been processed.",
      },
    };
  }

  throw error;
}

  // /status
  if (commandName === "status") {
    return {
      type: 4,
      data: {
        content: "✅ Bot is online and working!",
      },
    };
  }

  // /report
 if (commandName === "report") {
  try {
    await discordService.sendReportToChannel({
      username,
      userId: discordUserId,
      reportText: inputText,
    });
  } catch (error) {
    console.error(
      "Failed to mirror report:",
      error.response?.data || error.message
    );
  }

  return {
    type: 4,
    data: {
      content: "✅ Report received successfully.",
    },
  };
}
  // Unknown command
  return {
    type: 4,
    data: {
      content: `Unknown command: ${commandName}`,
    },
  };
};

module.exports = {
  processInteraction,
};