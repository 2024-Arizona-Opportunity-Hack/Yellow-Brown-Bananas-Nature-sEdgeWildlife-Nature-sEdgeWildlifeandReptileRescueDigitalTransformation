import React from "react";
import Hero from "./components/Intro.js";
// import Navbar from './components/Header.js';

function LandingPage() {
  return (
    <>
      <div className = "pt-[4.75rem] lg:pt[5.25rem] overflow-hidden">
        <Hero/>
      </div>
    </>
  );
}

export default LandingPage;
