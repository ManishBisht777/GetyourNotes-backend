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

// route 3: updating notes of user : login required (/api/notes/updatenote)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // create new note object
    const newnote = {};

    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    console.log(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.send(error);
  }
});

// route : 4 delete a note of user :login required (/api/notes/deletenote);
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be deleted
    let note = await Notes.findById(req.params.id);
    console.log(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    // allow deletion if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ sucess: "note has been deleted", note: note });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
