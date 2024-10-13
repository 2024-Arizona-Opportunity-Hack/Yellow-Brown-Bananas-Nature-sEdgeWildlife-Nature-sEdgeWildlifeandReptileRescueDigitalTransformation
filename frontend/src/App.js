import './App.css';
import React from "react";
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import IntakeForm from "./pages/IntakeForm.js";
import Search from "./pages/Search.js";
import LogIn from './pages/LogIn.js';
import Register from './pages/Register.js';
import AuthService from './services/AuthService.js';
import LandingPage from './pages/LandingPage.js';
import Navbar from './pages/components/Header.js';

function PrivateRoute({ element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to indicate loading state

  useEffect(() => {
    // Check authentication status when the component mounts
    const checkAuth = async () => {
      const authStatus = AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  // Render loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the provided component; otherwise, redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<PrivateRoute element={<Search />} />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
