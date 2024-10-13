import './App.css';
import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";

import Home from "./Pages/Home.js";
import  Adoption  from './Pages/Adoption.js';
import Intake from "./Pages/Intake.js"
function App() {
  return (
    <>
      <Routes>
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/intake" element={<Intake />} />
      </Routes>
      
    </>
  );
}

export default App;
