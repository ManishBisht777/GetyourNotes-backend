const express = require("express");
const User = require("../models/user");

const router = express.Router();

// create a user using:post("/api/auth/") .. doesnt require authentication
router.post("/", (req, res) => {
  console.log(req.body);
  const user = User(req.body);
  user.save();
});

module.exports = router;
