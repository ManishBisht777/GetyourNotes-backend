import React, { useState, useContext } from "react";
import noteContext from "../context/notes/notesContext";

function Addnote() {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleaddnote = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
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
              value={note.title}
              onChange={onchange}
              minLength={5}
              required
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
              value={note.description}
              onChange={onchange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input
              className="form-control"
              type="text"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleaddnote}
          >
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
