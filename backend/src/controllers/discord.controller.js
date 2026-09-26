const interactionService = require("../services/interaction.service");

const handleInteraction = async (req, res, next) => {
  try {
    const result = await interactionService.processInteraction(
      req.body
    );

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleInteraction,
};