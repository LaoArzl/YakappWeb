import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const drawer = useSelector((state) => state.drawer.value);
  return (
    <div className={drawer ? "sidebar-active" : "sidebar"}>
      <div className="sidebar-header">
        {drawer ? (
          <h3 className="h3-header">
            <span>Yakapp</span> CRM
          </h3>
        ) : null}
      </div>
      <Link
        to="/"
        className={
          window.location.pathname === "/"
            ? "sidebar-item-active"
            : "sidebar-item"
        }
      >
        <i className="fas fa-home"></i>
        {drawer && "Dashboard "}
      </Link>
      <div className="management">{drawer ? "MANAGEMENT" : "-"}</div>
      <Link
        to="/vocabulary"
        className={
          window.location.pathname === "/vocabulary"
            ? "sidebar-item-active"
            : "sidebar-item"
        }
      >
        <i className="fas fa-file-word"></i>
        {drawer && "Vocabulary"}
      </Link>
      <Link
        to="/lesson"
        className={
          window.location.pathname === "/lesson" ||
          window.location.pathname === props.url
            ? "sidebar-item-active"
            : "sidebar-item"
        }
      >
        <i className="fas fa-book"></i>
        {drawer && "Lessons"}
      </Link>
      <Link
        to="/images"
        className={
          window.location.pathname === "/images"
            ? "sidebar-item-active"
            : "sidebar-item"
        }
      >
        <i className="fas fa-images"></i>
        {drawer && "Images"}
      </Link>
    </div>
  );
};

export default Sidebar;
