import React, { useState, useEffect } from "react";
import "./AddChapter.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import ImagePicker from "./ImagePicker";

const ViewChapter = (props) => {
  const lesson = useSelector((state) => state.lesson.value);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [icon, setIcon] = useState("");
  const [active, setActive] = useState("");
  const [pick, setPick] = useState(false);

  useEffect(() => {
    console.log(
      lesson
        .filter((id) => id._id === props.id)
        .map((e) =>
          e.chapters
            .map((f) => f)
            .filter((chapter) => chapter._id === props.tempId)
            .map((spec) => {
              setTitle(spec.title);
              setContent(spec.content);
              setReference(spec.reference);
              setIcon(spec.header);
            })
        )
    );
  }, []);

  const handleSubmit = () => {
    Axios.put(`http://localhost:3001/update-chapter/${props.tempId}`, {
      title: title,
      content: content,
      reference: reference,
      header: icon,
    })
      .then((response) => {
        console.log(response);
        props.setState("Added");
        setTimeout(() => props.setState(""), 1000);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      {pick && (
        <div className="dashboard-container-after">
          <ImagePicker
            setPick={setPick}
            setActive={setActive}
            active={active}
            setIcon={setIcon}
          />
        </div>
      )}
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
            <em>Header Image</em>
          </label>

          <div style={{ fontSize: "14px" }}>
            <input
              style={{ marginBottom: 10 }}
              placeholder={
                icon === "" || (icon === undefined && "No image selected")
              }
              type="text"
              value={active || icon}
            />
            <button
              onClick={() => {
                setPick(true);
                console.log(icon);
              }}
            >
              Import
            </button>
          </div>
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
            onClick={() => {
              props.setViewForm(false);
              props.setTempId("");
            }}
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
    </>
  );
};

export default ViewChapter;
