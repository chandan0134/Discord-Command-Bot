const processInteraction = async (interaction) => {
  console.log("Processing Discord interaction:", interaction);

  // Discord PING
  if (interaction.type === 1) {
    return {
      type: 1,
    };
  }

  return {
    type: 4,
    data: {
      content: "Interaction received",
    },
  };
};

module.exports = {
  processInteraction,
};