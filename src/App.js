import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import Vocabulary from "./Pages/Admin/Vocabulary";
import Lesson from "./Pages/Admin/Lesson";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Admin/Login";
import { useEffect } from "react";
import Axios from "axios";
import { login } from "./features/user";
import Chapter from "./Components/Chapter";
import Images from "./Pages/Admin/Images";
import { Redirect } from "react-router-dom";
import { updateImage } from "./features/images";

function App() {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.lesson.value);

  useEffect(() => {
    Axios.get("http://localhost:3001/login-admin")
      .then((response) => {
        if (response.data.loggedIn) {
          dispatch(login({ isLoggedIn: true, name: response.data.userType }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/image").then((response) => {
      if (response) {
        dispatch(updateImage(response.data));
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/" exact component={Dashboard} />
        <ProtectedRoute path="/vocabulary" exact component={Vocabulary} />
        <ProtectedRoute path="/images" exact component={Images} />
        <Route path="/lesson" exact component={Lesson} />
        <Route path="/login" exact component={Login} />
        {/* <ProtectedRoute path="/lesson/chapter/:id" component={Chapter} /> */}

        {lesson.map((e) => {
          return (
            <ProtectedRoute
              key={e._id}
              path={"/lesson/chapter/:id"}
              component={Chapter}
              id={e._id}
            />
          );
        })}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
