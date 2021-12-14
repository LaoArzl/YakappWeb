import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./Dashboard.css";
import AddLesson from "../../Components/AddLesson";
import Toast from "../../Components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { updateLesson } from "../../features/lessons";
import Axios from "axios";
import Confirmation from "../../Components/Confirmation";
import { Link } from "react-router-dom";

const Lesson = () => {
  const lesson = useSelector((state) => state.lesson.value);
  const dispatch = useDispatch();

  const [form, setForm] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    Axios.get("https://yakapp.herokuapp.com/add-lesson").then((response) => {
      dispatch(updateLesson(response.data));
    });
  }, [state]);

  const handleDelete = (id) => {
    Axios.delete(`https://yakapp.herokuapp.com/delete-lesson/${id}`).then(
      (response) => {
        if (response.data) {
          setState("deleted");
          setTimeout(() => setState(""), 3000);
          setConfirm(false);
          setItem("");
        }
      }
    );
  };
  return (
    <div className="dashboard-container">
      {toast && <Toast setToast={setToast} message={message} />}
      {form && (
        <>
          <div className="dashboard-container-after">
            <AddLesson
              setState={setState}
              setMessage={setMessage}
              setToast={setToast}
              setForm={setForm}
            />
          </div>
        </>
      )}
      {confirm && (
        <>
          <div className="dashboard-container-after">
            <Confirmation
              setItem={setItem}
              item={item}
              delete={handleDelete}
              setConfirm={setConfirm}
            />
          </div>
        </>
      )}
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="content-body">
          <div className="content-body-header">
            <h3>All Lessons</h3>
          </div>
          <div className="content-body-body">
            <div className="table-upper-header">
              <p>
                Showing {lesson.length} results out of {lesson.length}
              </p>
              <div>
                <input
                  placeholder="Search lessons"
                  className="table-search"
                  type="search"
                />
                <div onClick={() => setForm(true)} className="add-btn">
                  <i className="fas fa-plus"></i>Create
                </div>
              </div>
            </div>
            <div className="table-header">
              <div className="table-header-wrapper">
                <div className="header-number">#</div>
                <div className="header-name">Lesson name</div>
                <div className="header-chapters">Chapters </div>
              </div>
              {/* <div className="header-action">Action</div> */}
            </div>

            {lesson.map((e, key) => {
              return (
                <Link
                  to={"/lesson/chapter/" + e.lessonTitle}
                  className={key % 2 === 0 ? "table-body" : "table-body-2"}
                >
                  <div className="table-header-wrapper">
                    <div className="header-number">{key + 1}</div>
                    <div className="header-names">{e.lessonTitle}</div>
                    <div className="header-chapters">{e.chapters.length} </div>
                  </div>

                  {/* <div  className="header-action">
                    <i
                      onClick={() => {
                        setConfirm(true);
                        setItem(e._id);
                      }}
                      className="fas fa-trash"
                    ></i>
                  </div> */}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
