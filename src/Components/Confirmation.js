import React from "react";
import "./Confirmation.css";

const Confirmation = (props) => {
  return (
    <div className="confirmation-box">
      <div className="confirmation-header">
        <p>Confirm delete</p>
      </div>
      <div className="confirmation-body">
        <p>
          Are you sure you want to <span>delete</span> this lesson? You will no
          longer be able to retrieve this once deleted. Please proceed with
          cautious.
        </p>
      </div>
      <div className="confirmation-btns">
        <div onClick={() => props.setConfirm(false)} className="confirm-no-btn">
          Cancel
        </div>
        <div onClick={() => props.delete(props.item)} className="confirm-btn">
          Yes, Confirm and Delete
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
