const Interaction = require("../models/interaction.model");

const getStats = async () => {
  const [
    totalInteractions,
    statusCount,
    reportCount,
    successfulCount,
    failedCount,
  ] = await Promise.all([
    Interaction.countDocuments(),

    Interaction.countDocuments({
      commandName: "status",
    }),

    Interaction.countDocuments({
      commandName: "report",
    }),

    Interaction.countDocuments({
      status: "success",
    }),

    Interaction.countDocuments({
      status: "failed",
    }),
  ]);

  return {
    totalInteractions,
    statusCount,
    reportCount,
    successfulCount,
    failedCount,
  };
};

const getRecentInteractions = async () => {
  return Interaction.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .select(
      "discordInteractionId commandName discordUserId username inputText status errorMessage createdAt"
    )
    .lean();
};

module.exports = {
  getStats,
  getRecentInteractions,
};