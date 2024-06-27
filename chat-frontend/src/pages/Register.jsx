/*
   Description: Registration component for creating new user accounts.
   Author: Sujan Baskota
   Date created: June 25, 2024
   Date modified: June 26, 2024
   <Start of modification section>
       2024-06-25 => Initial creation of Register component with form handling and user registration.
   <End of modification section>
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../components/Context";
import { registerUser } from "../components/apicalls";

const Register = () => {
  const { setUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const wrapper = async () => {
      e.preventDefault();
      console.log({
        username,
        email,
        password,
      });
      const user = await registerUser(email, username, password);
      setUser(user);
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
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Register
        </button>
        <div className="flex justify-center p-2 gap-2 ">
          <h1>Have an account?</h1>
          <h1
            className="underline text-blue-600"
            onClick={() => navigate("/login")}
          >
            Login
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Register;
