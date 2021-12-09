import React, { useState, useEffect } from "react";
import "./AddImageForm.css";
import Axios from "axios";

const AddImageForm = ({ setAfter }) => {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview("");
    }
  }, [image]);

  const upload = async () => {
    setAfter(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ayivjexe");
    formData.append("cloud_name", "defutech-inc");

    fetch("https://api.cloudinary.com/v1_1/defutech-inc/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        Axios.post("http://localhost:3001/image", {
          uri: data.url,
        }).then((response) => {
          if (response.data.success === "success") {
            setPreview("");
            setImage("");
            setAfter(false);
          }
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="image-form">
      <div className="image-form-header">
        <h3>Upload Image</h3>
        <i onClick={() => setAfter(false)} className="fas fa-times"></i>
      </div>
      <div className="image-form-body">
        <div className="image-drop">
          {preview !== "" ? (
            <div className="image-drop-wrapper">
              <div
                onClick={() => {
                  setImage("");
                  setPreview("");
                }}
                className="remove-img"
              >
                Remove
              </div>
              <img src={preview} />
            </div>
          ) : (
            <>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file && file.type.substr(0, 5) === "image") {
                    setImage(file);
                  } else {
                    setImage("");
                  }
                }}
                type="file"
              />
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Click here to upload</p>
            </>
          )}
        </div>
        <div onClick={() => upload()} className="upload-btn">
          <b>Upload</b>
        </div>
      </div>
    </div>
  );
};

export default AddImageForm;
