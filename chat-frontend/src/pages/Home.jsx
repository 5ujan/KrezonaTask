// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Chat Application
        </h1>
        <div className="flex w-[40rem] items-center align-center flex-col"> 
        
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
