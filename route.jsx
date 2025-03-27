import React from "react";
import { Routes, Route } from "react-router-dom";
import Front from "./Front";
import Login from "./login";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Front />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </Provider>
  );
}

export default App;
