import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";

function About() {
  const a = useContext(noteContext);
  return (
    <div>
      This is about {a.name} of age {a.age}
    </div>
  );
}

export default About;
