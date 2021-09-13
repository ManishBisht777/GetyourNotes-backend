import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/notesContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getnotes } = context;
  useEffect(() => {
    getnotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Addnote />
      <div className="row my-3">
        {notes.map((note) => {
          return <Noteitem note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
