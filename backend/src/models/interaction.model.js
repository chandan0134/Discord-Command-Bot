const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    discordInteractionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    type: {
      type: Number,
      required: true,
    },

    commandName: {
      type: String,
      default: null,
    },

    discordUserId: {
      type: String,
      default: null,
    },

    username: {
      type: String,
      default: null,
    },

    inputText: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["received", "processing", "success", "failed"],
      default: "received",
    },

    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Interaction = mongoose.model(
  "Interaction",
  interactionSchema
);

module.exports = Interaction;