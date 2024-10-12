import './App.css';
import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";

import Home from "./pages/Home.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
