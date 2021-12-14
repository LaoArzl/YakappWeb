import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./Dashboard.css";
import "./Vocabulary.css";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { updateWord } from "../../features/word";

const Vocabulary = () => {
  const word = useSelector((state) => state.word.value);
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  useEffect(() => {
    Axios.get("http://yakapp.herokuapp.com/words").then((response) => {
      dispatch(updateWord(response.data));
    });
  }, [state]);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="content-body">
          <div className="content-body-header">
            <h3>List of Words</h3>
          </div>
          <div className="content-body-body">
            <div className="table-upper-header">
              <p>
                Showing {word.length} results out of {word.length}
              </p>
              <div>
                <input
                  placeholder="Search lessons"
                  className="table-search"
                  type="search"
                />
                <div className="add-btn">
                  <i className="fas fa-plus"></i>Add
                </div>
              </div>
            </div>
            <div className="table-header">
              <div className="header-number">#</div>
              <div className="header-name">Yakan</div>
              <div className="header-chapters">English </div>
              <div className="header-action">Action</div>
            </div>

            {word.map((e, key) => {
              return (
                <div className={key % 2 === 0 ? "table-body" : "table-body-2"}>
                  <div className="header-number">{key + 1}</div>
                  <div className="header-names">{e.Yakan}</div>
                  <div className="header-chapters">{e.English} </div>
                  <div className="header-action">
                    <p>Delete</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
