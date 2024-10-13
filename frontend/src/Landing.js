import './App.css';
import React from "react";
// import { Route, Routes, Redirect } from "react-router-dom";
import Hero from "./Pages/components/Intro.js";

import Navbar from './Pages/components/Header.js';

function App() {
  return (
    <>
     
    <div className = "pt-[4.75rem] lg:pt[5.25rem] overflow-hidden">
      <Navbar/>
      <Hero/>
    </div>
    </>
  );
}

export default App;
