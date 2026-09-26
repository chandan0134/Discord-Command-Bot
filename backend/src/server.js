const express = require("express");
const env = require("./config/env");

const discordRoutes = require("./routes/discord.routes");

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Discord Command Bot API is running",
  });
});

app.use("/api/discord", discordRoutes);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});