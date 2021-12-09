import React, { useState } from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ id, component: Component, ...rest }) => {
  const [hey, setHey] = useState(true);
  const user = useSelector((state) => state.user.value);
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        if (user.isLoggedIn) {
          return <Component id={id} />;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: props.location }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
