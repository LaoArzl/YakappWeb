import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./Dashboard.css";
import { withRouter } from "react-router";
import Axios from "axios";
import AddImageForm from "../../Components/AddImageForm";
import { useSelector, useDispatch } from "react-redux";
import { updateImage } from "../../features/images";
import EditImage from "../../Components/EditImage";

const Images = () => {
  const [after, setAfter] = useState(false);
  const image = useSelector((state) => state.image.value);
  const dispatch = useDispatch();
  const [editImage, setEditImage] = useState(false);
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get("https://yakapp.herokuapp.com/image").then((response) => {
      if (response) {
        dispatch(updateImage(response.data));
      }
    });
  }, [image]);
  return (
    <div className="dashboard-container">
      {after && (
        <>
          <div className="dashboard-container-after">
            <AddImageForm setAfter={setAfter} />
          </div>
        </>
      )}

      {editImage && (
        <>
          <div className="dashboard-container-after">
            <EditImage setEditImage={setEditImage} uri={uri} setUri={setUri} />
          </div>
        </>
      )}
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="content-body">
          <div className="content-body-header">
            <h3>Stock Images</h3>
          </div>
          <div className="content-body-body">
            <div className="image-upper-header">
              <input
                placeholder="Search lessons"
                className="table-search"
                type="search"
              />
              <div
                onClick={() => {
                  setAfter(true);
                }}
                className="add-btn"
              >
                <i className="fas fa-plus"></i>Upload
              </div>
            </div>

            <div
              style={{ display: "flex", padding: "20px", flexWrap: "wrap" }}
              className="image-upper-body"
            >
              {image.map((e) => {
                return (
                  <div className="image-stock">
                    <img
                      onClick={() => {
                        setEditImage(true);
                        setUri(e.uri);
                      }}
                      src={e.uri}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Images);
