const nacl = require("tweetnacl");
const env = require("../config/env");

const verifyDiscordSignature = (req, res, next) => {
  try {
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];

    if (!signature || !timestamp || !req.rawBody) {
      return res.status(401).json({
        message: "Missing Discord signature data",
      });
    }

    const message = Buffer.concat([
      Buffer.from(timestamp),
      req.rawBody,
    ]);

    const isValid = nacl.sign.detached.verify(
      message,
      Buffer.from(signature, "hex"),
      Buffer.from(env.discord.publicKey, "hex")
    );

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid Discord signature",
      });
    }

    next();
  } catch (error) {
    console.error("Discord signature verification failed:", error);

    return res.status(401).json({
      message: "Invalid Discord request",
    });
  }
};

module.exports = verifyDiscordSignature;