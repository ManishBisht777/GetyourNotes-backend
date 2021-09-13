import React, { useState, useContext } from "react";
import noteContext from "../context/notes/notesContext";

function Addnote() {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "deafult",
  });
  const handleaddnote = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-4">
        <h3>Add Notes</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <input
              className="form-control"
              type="text"
              id="description"
              name="description"
              onChange={onchange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleaddnote}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
