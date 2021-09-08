const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "manishBisht";

// create a user using:post("/api/auth/") .. doesnt require authentication
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    //checking existing user

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtdata = jwt.sign(data, JWT_SECRET);
      console.log(jwtdata);
    } catch (error) {
      console.log(error.message);
    }
  }
);

// authnticate a user using post("api/auth/login") : no login required

router.post(
  "/login",
  [
    body("email", "Enter a Valid Email address").isEmail(),
    body("password", "password can not be empty").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        console.log("notfound");
        return req
          .status(400)
          .json({ error: "try to login with correct credetails" });
      }
      console.log("found");
      console.log(user.password);

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return req
          .status(400)
          .json({ error: "try to login with correct credetails" });
      } else {
        console.log("success");
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtdata = jwt.sign(data, JWT_SECRET);
      res.send(jwtdata);
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;
