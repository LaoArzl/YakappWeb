import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./features/drawer";
import userReducer from "./features/user";
import lessonReducer from "./features/lessons";
import wordReducer from "./features/word";
import imageReducer from "./features/images";

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    user: userReducer,
    lesson: lessonReducer,
    word: wordReducer,
    image: imageReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
