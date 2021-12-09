import React from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/drawer";
import Logo from "../Pages/Admin/logo-light.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  return (
    <nav className="navbar">
      <i onClick={() => dispatch(toggle(false))} className="fas fa-bars"></i>
      <div className="admin-profile">
        <div className="profile-avatar">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="profile-name">{user.name}</div>
        <i className="fas fa-angle-down"></i>
      </div>
    </nav>
  );
};

export default Navbar;
