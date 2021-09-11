import React from "react";
import noteContext from "./notesContext";

const NoteState = (props) => {
  const state = {
    name: "manish",
    age: "18",
  };

  return (
    <noteContext.Provider value={state}>{props.children}</noteContext.Provider>
  );
};

export default NoteState;
