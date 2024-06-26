// src/context/AppContext.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  let u = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(u);
  const [gifUrls, setGifUrls] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userGifs, setUsergifs] = useState([])
  const [pendingImage, setPendingImage] = useState()
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/images/get"
        );
        setGifUrls(response.data.gif_urls);
        console.log(response.data.gif_urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser,messages, setMessages, gifUrls, setGifUrls, userGifs, setUsergifs, pendingImage, setPendingImage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
