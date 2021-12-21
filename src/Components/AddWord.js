import React, { useState } from "react";
import "./AddWord.css";
import Axios from "axios";

const AddWord = (props) => {
  const [yak, setYak] = useState("");
  const [eng, setEng] = useState("");
  const [mean, setMean] = useState("");

  const handleSubmit = () => {
    Axios.post("https://yakapp.herokuapp.com/add-word", {
      yak,
      eng,
      mean,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setEng("");
          setYak("");
          setMean("");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="add-lesson-form">
      <div className="form-container">
        <label>
          <em>English</em>
        </label>
        <input
          value={eng}
          onChange={(e) => setEng(e.target.value)}
          type="text"
        />
      </div>

      <div className="form-container">
        <label>
          <em>Yakan</em>
        </label>
        <input
          value={yak}
          onChange={(e) => setYak(e.target.value)}
          type="text"
        />
      </div>

      <div className="form-container">
        <label>
          <em>Meaning</em>
        </label>
        <textarea
          className="reference-textarea"
          value={mean}
          onChange={(e) => setMean(e.target.value)}
        ></textarea>
      </div>

      <div className="submit-container">
        <input
          onClick={() => props.setAdd(false)}
          className="cancel-btn-form"
          type="submit"
          value="Cancel"
        />
        <input
          onClick={handleSubmit}
          className={
            eng === "" || yak === "" || mean === ""
              ? "submit-btn-form-disable"
              : "submit-btn-form"
          }
          type="submit"
          value="Save"
        />
      </div>
    </div>
  );
};

export default AddWord;
