import React, { useEffect, useState } from "react";
import Logo from "../../Assets/logo-dark.png";
import "./Login.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user";
import { Redirect } from "react-router";
import Axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    Axios.post("http://localhost:3001/login-admin", {
      username,
      password,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
        setTimeout(() => {
          setErrMsg("");
        }, 30000);
      } else {
        dispatch(
          login({
            isLoggedIn: response.data.auth,
            name: response.data.result[0].userType,
          })
        );
      }
    });
  };
  return (
    <>
      {user.isLoggedIn && <Redirect to="/" />}
      <div className="login-wrapper">
        <form onSubmit={(e) => e.preventDefault()} className="login-box">
          <div className="logo-container">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-text">
            <h3>Yakapp CRM</h3>
          </div>

          {errMsg.length !== 0 && <div className="error-msg">{errMsg}</div>}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-inp"
            placeholder="Username"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-inp"
            placeholder="Password"
            type="password"
          />
          <input
            // onClick={() => dispatch(login({ isLoggedIn: true }))}
            onClick={() => submitLogin()}
            className={
              username === "" || password === ""
                ? "submit-btn-diactive"
                : "submit-btn"
            }
            type="submit"
            value="Log In"
          />
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);
