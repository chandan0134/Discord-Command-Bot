const jwt = require("jsonwebtoken");

const env = require("../config/env");
const adminService = require("../services/admin.service");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    if (
      username !== env.admin.username ||
      password !== env.admin.password
    ) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        username,
        role: "admin",
      },
      env.admin.jwtSecret,
      {
        expiresIn: "2h",
      }
    );

    return res.json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error("Admin login failed:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await adminService.getStats();

    return res.json(stats);
  } catch (error) {
    console.error("Failed to get admin stats:", error);

    return res.status(500).json({
      message: "Failed to fetch admin stats.",
    });
  }
};

const getInteractions = async (req, res) => {
  try {
    const interactions = await adminService.getRecentInteractions();

    return res.json({
      interactions,
    });
  } catch (error) {
    console.error("Failed to get interactions:", error);

    return res.status(500).json({
      message: "Failed to fetch interactions.",
    });
  }
};

module.exports = {
  login,getStats,getInteractions,
};