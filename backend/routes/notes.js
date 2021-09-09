const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/notes");
const { body, validationResult } = require("express-validator");

//route :1 fetching all notes of user :-> login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json([notes]);
});

//route :2 adding new notes :-> login required :/api/notes/addnote

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please Enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ savedNote });
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
