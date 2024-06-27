/*
   Description: Home component for the chat application, providing links to login and register.
   Author: Sujan Baskota
   Date created: June 25, 2024
   Date modified: June 26, 2024
   <Start of modification section>
       2024-06-25 => Initial creation of Home component with links to login and register pages.
   <End of modification section>
*/

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
