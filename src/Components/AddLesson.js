import React, { useState } from "react";
import Axios from "axios";

const AddLesson = (props) => {
  const [chapters, setChapters] = useState([]);
  const [name, setName] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleRemoveItem = (name) => {
    setChapters(chapters.filter((item) => item.title !== name));
  };

  const handleAddItem = (name) => {
    if (chapters.some((e) => e.title === name)) {
      props.setToast(true);
      setTimeout(() => {
        props.setToast(false);
        props.setMessage("");
      }, 5000);
      props.setMessage("Chapter name already exist.");
    } else {
      setChapters([...chapters, { title: name, content: "" }]);
    }
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/add-lesson", {
      lessonTitle,
      description,
    })
      .then((response) => {
        if (response.data.success) {
          setDescription("");
          setLessonTitle("");
          setName("");
          props.setState("created item");
          setTimeout(() => props.setState(""), 3000);
          props.setMessage("Successfully Added");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-lesson-form">
      <div className="form-container">
        <label>
          <em>Lesson name</em>
        </label>
        <input
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          type="text"
        />
      </div>
      <div className="form-container">
        <label>
          <em>Description (Optional)</em>
        </label>
        <div className="add-chapter">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="form-container">
        <label>
          <em>Image Icon</em>
        </label>
        <div className="add-chapter">
          <input />
        </div>
      </div>
      {/* <div className="chapter-container">
        {chapters.map((e, index) => {
          return (
            <>
              <div name={e.title} className="chapters">
                <b>
                  Chapter {index + 1}
                  {" " + "-" + " "}
                </b>
                {e.title}

                <i
                  onClick={() => handleRemoveItem(e.title)}
                  className="fas fa-times"
                ></i>
              </div>
            </>
          );
        })}
      </div> */}
      <div className="submit-container">
        <input
          onClick={() => props.setForm(false)}
          className="cancel-btn-form"
          type="submit"
          value="Cancel"
        />
        <input
          onClick={handleSubmit}
          className={
            lessonTitle === "" ? "submit-btn-form-disable" : "submit-btn-form"
          }
          type="submit"
          value="Save"
        />
      </div>
    </div>
  );
};

export default AddLesson;
