const express = require("express");

const adminController = require("../controllers/admin.controller");
const authenticateAdmin = require("../middleware/adminAuth.middleware");

const router = express.Router();

router.post("/login", adminController.login);

router.get(
  "/stats",
  authenticateAdmin,
  adminController.getStats
);

router.get(
  "/interactions",
  authenticateAdmin,
  adminController.getInteractions
);

module.exports = router;