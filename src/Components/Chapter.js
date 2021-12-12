import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AddChapter from "./AddChapter";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { updateLesson } from "../features/lessons";
import ViewChapter from "./ViewChapter";
import Toast from "./Toast";
import Confirmation from "./Confirmation";
import { Redirect } from "react-router";
import ImagePicker from "./ImagePicker";
import { useParams } from "react-router-dom";

const Chapter = (props, { match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const lesson = useSelector((state) => state.lesson.value);
  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [tempId, setTempId] = useState("");
  const [tabs, setTabs] = useState("lesson");
  const [confirm, setConfirm] = useState(false);

  const [lessonTitle, setLessonTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [chapters, setChapters] = useState(0);
  const [id, setId] = useState("");
  const [pick, setPick] = useState(false);
  const [active, setActive] = useState("");
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    lesson
      .filter((id) => id.lesson === props.id)
      .map((e) => {
        setLessonTitle(e.lessonTitle);
        setDescription(e.description);
        setIcon(e.icon);
        setChapters(e.chapters.length);
      });
  }, []);

  const { chapterId } = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/add-lesson").then((response) => {
      dispatch(updateLesson(response.data));
    });
  }, [state]);

  const view = (tempId) => {
    setViewForm(true);
    setTempId(tempId);
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete-lesson/${props.id}`).then(
      (response) => {
        if (response.data) {
          setState("deleted");
          setTimeout(() => setState(""), 3000);
          setConfirm(false);
          history.goBack();
        }
      }
    );
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:3001/update-lesson/${props.id}`, {
      lessonTitle,
      description,
      icon: active,
    }).then((response) => {
      if (response.data) {
        setState("deleted");
        setTimeout(() => setState(""), 3000);
        setConfirm(false);
        setToast(true);
        setMessage("Updated successfully.");
        setStatus("success");
        setTimeout(() => {
          setToast(false);
          setMessage("");
          setStatus("");
        }, 8000);
      }
    });
  };

  return (
    <>
      {showForm && (
        <div className="dashboard-container-after">
          <AddChapter
            id={props.id}
            setState={setState}
            setShowForm={setShowForm}
          />
        </div>
      )}

      {confirm && (
        <>
          <div className="dashboard-container-after">
            <Confirmation delete={handleDelete} setConfirm={setConfirm} />
          </div>
        </>
      )}

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

      {viewForm && tempId !== "" && (
        <div className="dashboard-container-after">
          <ViewChapter
            id={props.id}
            setState={setState}
            setViewForm={setViewForm}
            setTempId={setTempId}
            tempId={tempId}
          />
        </div>
      )}
      <div className="dashboard-container">
        {toast && (
          <Toast message={message} setToast={setToast} status={status} />
        )}
        <Sidebar url={window.location.pathname} />
        <div className="dashboard-content">
          <Navbar />
          <div className="content-body">
            <div className="content-body-header">
              <div onClick={() => history.goBack()} className="goBack-btn">
                Go back
              </div>
            </div>
            <div className="content-body-body">
              <div style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <div className="chapter-upper-header">
                  <p>
                    Lesson Title:{" "}
                    <span>
                      {lesson
                        .filter((id) => id._id === props.id)
                        .map((e) => e.lessonTitle)}
                    </span>
                  </p>

                  {tabs === "chapters" && (
                    <div
                      onClick={() => setShowForm(true)}
                      className="add-chapter-btn"
                    >
                      Add chapter
                    </div>
                  )}
                </div>
                <div className="chapter-header">
                  <div
                    onClick={() => setTabs("lesson")}
                    className={
                      tabs === "lesson" ? "span-active" : "span-diactive"
                    }
                  >
                    Lesson
                  </div>
                  <div
                    onClick={() => setTabs("chapters")}
                    className={
                      tabs === "chapters" ? "span-active" : "span-diactive"
                    }
                  >
                    Chapters
                  </div>
                </div>
              </div>

              <div className="chapter-body">
                {tabs === "lesson" && (
                  <>
                    <div className="lesson-page">
                      <div className="page-wrapper">
                        <label>Title:</label>
                        <input
                          onChange={(e) => setLessonTitle(e.target.value)}
                          value={lessonTitle}
                          type="text"
                        />
                      </div>
                      <div className="page-wrapper">
                        <label>Description: </label>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          placeholder={!description && "No Description"}
                        />
                      </div>

                      <div className="page-wrapper">
                        <label>Icon:</label>
                        <div>
                          {icon ? (
                            <>
                              <div
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  border: "1px solid lightgrey",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img style={{ width: "100%" }} src={icon} />
                              </div>
                              <span onClick={() => setPick(true)}>Change</span>
                            </>
                          ) : active ? (
                            <>
                              <div
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  border: "1px solid lightgrey",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {active !== "" && (
                                  <i
                                    onClick={() => setActive("")}
                                    className="fas fa-times"
                                  ></i>
                                )}
                                <img style={{ width: "100%" }} src={active} />
                              </div>
                              <p>change</p>
                            </>
                          ) : (
                            <>
                              <p>No icon set</p>
                              <div
                                onClick={() => setPick(true)}
                                className="pick"
                              >
                                Pick
                              </div>{" "}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="page-wrapper">
                        <label>Chapters:</label>
                        <p>{chapters}</p>
                      </div>
                      <div className="submit-container">
                        <input
                          onClick={() => setConfirm(true)}
                          className="cancel-btn-form"
                          type="submit"
                          value="Delete"
                          style={{
                            color: "#D22B2B",
                            border: "1px solid #D22B2B",
                          }}
                        />
                        <input
                          onClick={() => handleUpdate()}
                          className={
                            lessonTitle.length === 0
                              ? "submit-btn-form-disable"
                              : "submit-btn-form"
                          }
                          type="submit"
                          value="Save"
                        />
                      </div>
                    </div>
                  </>
                )}
                {tabs === "chapters" && (
                  <>
                    {" "}
                    {lesson
                      .filter((id) => id._id === props.id)
                      .map((e) => {
                        if (e.chapters.length === 0) {
                          return (
                            <p className="no-chapter-p">
                              There's no chapter in this lesson.
                            </p>
                          );
                        } else {
                          return null;
                        }
                      })}
                    {lesson
                      .filter((id) => id._id === props.id)
                      .map((e) =>
                        e.chapters
                          .map((f) => f)
                          .map((chapter, key) => {
                            return (
                              <div
                                onClick={() => {
                                  view(chapter._id);
                                }}
                                className="chapter"
                              >
                                <div className="chapter-title">
                                  Chapter {key + 1}: <p>{chapter.title}</p>
                                </div>
                                <i
                                  onClick={() => alert("Sd")}
                                  className="fas fa-times"
                                ></i>
                              </div>
                            );
                          })
                      )}{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chapter;
