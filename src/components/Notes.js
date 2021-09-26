import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notesContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useHistory } from "react-router-dom";
function Notes() {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes, getnotes, editnote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);
  const updatenote = (currentNote) => {
    ref.current.click();
    setnote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      id: currentNote._id,
    });
  };

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "deafult",
  });
  const handleaddnote = (e) => {
    console.log("updating note ", note);
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    value={note.etitle}
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
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
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
                    id="etag"
                    name="etag"
                    onChange={onchange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleaddnote}
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem note={note} updatenote={updatenote} />;
        })}
      </div>
    </>
  );
}

export default Notes;
