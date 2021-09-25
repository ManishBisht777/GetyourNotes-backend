import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updatenote } = props;

  return (
    <div>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <i
              className="fas fa-trash-alt mx-2"
              onClick={() => {
                deletenote(note._id);
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
