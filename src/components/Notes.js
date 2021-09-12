import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import Noteitem from "./Noteitem";

function Notes() {
  const context = useContext(noteContext);
  const { notes /*setnotes*/ } = context;
  return (
    <div className="row">
      {notes.map((note) => {
        return <Noteitem note={note} />;
      })}
    </div>
  );
}

export default Notes;
