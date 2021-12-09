import React, { useState } from "react";

const EditChapter = (props) => {
  const [title, setTitle] = useState(props.title);

  return (
    <div className="edit-chapter">
      <div className="form-container">
        <label>
          <em>Chapter Title</em>
        </label>
        <input value={title} type="text" />
      </div>

      <div className="form-container">
        <label>
          <em>Content</em>
        </label>
        <div className="textarea-wrapper">
          <textarea />
        </div>
      </div>
      <div className="submit-container">
        <input
          onClick={() => props.setContent("main")}
          className="cancel-btn-form"
          type="submit"
          value="Back"
        />
        <input className="submit-btn-form" type="submit" value="Save" />
      </div>
    </div>
  );
};

export default EditChapter;
