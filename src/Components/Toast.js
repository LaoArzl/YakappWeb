import React from "react";
import "./Toast.css";

function Toast(props) {
  return (
    <div
      style={{
        background: props.status === "success" ? "rgb(70, 160, 70)" : "#e94040",
      }}
      className="toast"
    >
      <p>{props.message}</p>
      <div onClick={() => props.setToast(false)}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}

export default Toast;
