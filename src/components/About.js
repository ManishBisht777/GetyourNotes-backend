import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/notesContext";

function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      This is about {a.state.name} of age {a.state.age}
    </div>
  );
}

export default About;
