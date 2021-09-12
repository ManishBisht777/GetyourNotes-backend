import React from "react";
import noteContext from "./notesContext";
import { useState } from "react";

const NoteState = (props) => {
  const s1 = {
    name: "manish",
    age: "18",
  };

  const update = () => {
    setTimeout(() => {
      setstate({
        name: "manish Bisht",
        age: "10",
      });
    }, 10000);
  };

  const [state, setstate] = useState(s1);

  return (
    <noteContext.Provider value={{ state, update }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
