const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "manishBisht";
const fetchuser = require("../middleware/fetchuser");

let success = false;

//ROUTE:1  create a user using:post("/api/auth/") .. doesnt require authentication
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
      return res.status(400).json({ success, error: error.array() });
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
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });
      console.log(authtoken);
    } catch (error) {
      console.log(error.message);
    }
  }
);

//Route : 2 authnticate a user using post("api/auth/login") : no login required

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
        return res
          .status(400)
          .json({ success, error: "try to login with correct credetails" });
      }
      console.log(user.password);

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "try to login with correct credetails" });
      } else {
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const jwtdata = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken: jwtdata });
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Route : 3 get details of loggedin user

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password");
    console.log(user.name);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
