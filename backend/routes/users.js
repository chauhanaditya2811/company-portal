const express = require("express");
const User = require("../models/User");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/users/directory
// Core business rule:
//   - If the logged-in user is an EMPLOYEE, they see all ADMIN details.
//   - If the logged-in user is an ADMIN, they see all EMPLOYEE details.
router.get("/directory", requireAuth, async (req, res) => {
  try {
    const viewerRole = req.user.role;
    const targetRole = viewerRole === "employee" ? "admin" : "employee";

    const records = await User.find({ role: targetRole })
      .select("-password")
      .sort({ fullName: 1 });

    return res.json({
      viewerRole,
      directoryOf: targetRole,
      count: records.length,
      users: records,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error fetching directory" });
  }
});

module.exports = router;
