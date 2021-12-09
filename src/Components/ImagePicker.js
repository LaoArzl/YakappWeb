import React, { useState } from "react";
import "./ImagePicker.css";
import { useSelector } from "react-redux";

const ImagePicker = ({ setPick, setActive, active, setIcon }) => {
  const image = useSelector((state) => state.image.value);

  return (
    <div className="image-picker">
      <div className="image-picker-bottom">
        <input
          onClick={() => {
            setPick(false);
            setActive("");
          }}
          className="cancel-btn-form"
          type="submit"
          value="Cancel"
        />
        <input
          onClick={() => {
            setPick(false);
          }}
          className={
            active === "" ? "submit-btn-form-disable" : "submit-btn-form"
          }
          type="submit"
          value="Set"
        />
      </div>
      <div className="image-picker-header">
        <h3>Choose Icon</h3>
      </div>
      <div className="image-picker-body">
        {image.map((e) => {
          return (
            <div
              className={
                active === e.uri ? "image-stock-active" : "image-stock"
              }
            >
              <img
                onClick={() => {
                  setActive(e.uri);
                  setIcon(e.uri);
                }}
                src={e.uri}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePicker;
