import React from "react";
import noteContext from "./notesContext";
import { useState } from "react";
const host = "http://localhost:5000";

const NoteState = (props) => {
  const initialnotes = [];

  const [notes, setnotes] = useState(initialnotes);

  // get all notes
  const getnotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json[0]);
  };

  // add notes
  const addnote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setnotes(notes.concat(note));
  };

  // delete note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    const NewNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(NewNotes);
  };

  // edit note
  const editnote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    // logic to edit note

    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
