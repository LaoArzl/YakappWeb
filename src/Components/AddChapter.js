import React, { useState } from "react";
import "./AddChapter.css";
import Axios from "axios";

const AddChapter = (props) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");

  const handleSubmit = () => {
    Axios.put(`http://localhost:3001/add-chapter/${props.id}`, {
      title,
      content,
      reference,
    })
      .then((response) => {
        console.log(response);
        props.setState("Added");
        setTimeout(() => props.setState(""), 1000);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="add-chapter-form">
      <div className="form-container">
        <label>
          <em>Chapter name</em>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>

      <div className="form-container">
        <label>
          <em>Content</em>
        </label>
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className="form-container">
        <label>
          <em>Reference</em>
        </label>
        <textarea
          className="reference-textarea"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        ></textarea>
      </div>

      <div className="submit-container">
        <input
          onClick={() => props.setShowForm(false)}
          className="cancel-btn-form"
          type="submit"
          value="Cancel"
        />
        <input
          onClick={handleSubmit}
          className={
            title.length === 0 ? "submit-btn-form-disable" : "submit-btn-form"
          }
          type="submit"
          value="Save"
        />
      </div>
    </div>
  );
};

export default AddChapter;
