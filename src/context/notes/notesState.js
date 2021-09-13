import React from "react";
import noteContext from "./notesContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialnotes = [
    {
      _id: "613a1fa1b429bab73b187eca",
      user: "613771868151a3872b92d48b",
      title: "my 2nd note",
      description: "brush daily",
      tag: "apple",
      date: "2021-09-09T14:52:17.358Z",
      __v: 0,
    },
    {
      _id: "613b49d67c61e62cbac2380b",
      user: "613771868151a3872b92d48b",
      title: "my 3rd note",
      description: "brush daily",
      tag: "apple",
      date: "2021-09-10T12:04:38.536Z",
      __v: 0,
    },
    {
      _id: "613df94bffdaf6b890675b04",
      user: "613771868151a3872b92d48b",
      title: "my 4rd note",
      description: "brush daily",
      tag: "apple",
      date: "2021-09-12T12:57:47.263Z",
      __v: 0,
    },
  ];

  const [notes, setnotes] = useState(initialnotes);

  // add note
  const addnote = (title, description, tag) => {
    const note = {
      _id: "613a1fa1b429bab73b187ec5a",
      user: "613771868151a3872b92d48b",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-09T14:52:17.358Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };
  // delete note
  const deletenote = (id) => {
    const NewNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(NewNotes);
  };
  // edit note
  const editnote = (id, title, description, tag) => {};
  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
