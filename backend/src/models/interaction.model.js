const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    discordInteractionId: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: Number,
      required: true,
    },

    commandName: {
      type: String,
    },

    discordUserId: {
      type: String,
    },

    username: {
      type: String,
    },

    inputText: {
      type: String,
    },

    status: {
      type: String,
      enum: ["received", "processing", "success", "failed"],
      default: "received",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interaction",
  interactionSchema
);