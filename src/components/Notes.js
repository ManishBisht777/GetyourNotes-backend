import React, { useContext, useEffect, useRef } from "react";
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

  const updatenote = (note) => {
    ref.current.click();
  };

  const ref = useRef(null);
  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
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
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
