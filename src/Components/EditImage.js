import React from "react";
import "./EditImage.css";

const EditImage = ({ setEditImage, uri, setUri, name }) => {
  return (
    <div className="edit-image">
      <i
        onClick={() => {
          setEditImage(false);
          setUri("");
        }}
        className="fas fa-times"
      ></i>
      <div className="edit-image-left">
        <img src={uri} />
      </div>
      <div className="edit-image-right">
        <p>
          {uri.replace(
            "http://res.cloudinary.com/defutech-inc/image/upload/",
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default EditImage;
