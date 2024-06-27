/* 
   Description: Main entry point for the application routing.
   Author: Sujan Baskota
   Date created: June 26, 2024
   Date modified: June 26, 2024
   <Start of modification section>
       2024-06-26 => Added routing for Home, Login, Register, Chat, Upload, Payment, and Completion pages.
   <End of modification section>
*/

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/Context";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Payment from "./pages/Payment";
import Completion from "./pages/Completion";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
