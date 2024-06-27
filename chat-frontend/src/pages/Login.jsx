/*
   Description: Login component for user authentication.
   Author: Sujan Baskota
   Date created: June 25, 2024
   Date modified: June 26, 2024
   <Start of modification section>
       2024-06-25 => Initial creation of Login component with email and password authentication.
   <End of modification section>
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../components/Context";
import { loginUser } from "../components/apicalls";

const Login = () => {
  const { user, setUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/chat"); // Redirect to chat if user is already logged in
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    const wrapper = async () => {
      e.preventDefault();
      const user = await loginUser(email, password);
      // Assume a successful login for demonstration purposes
      // Replace with actual user data after authentication
      console.log(user.user);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/chat");
    };
    wrapper();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <div className="flex justify-center p-2 gap-2 ">
          <h1>Don't have an account?</h1>
          <h1
            className="underline text-blue-600"
            onClick={() => navigate("/register")}
          >
            Register
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Login;
