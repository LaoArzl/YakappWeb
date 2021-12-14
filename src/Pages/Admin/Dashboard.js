import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { Grid } from "@mui/material";
import Login from "./Login";
import "./Dashboard.css";
import { withRouter } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="content-body">
          <div className="content-body-header">
            <h3>Dashboard Overview</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
