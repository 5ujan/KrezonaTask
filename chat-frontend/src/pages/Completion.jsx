/*
   Description: Component to handle the completion of the purchase process.
   Author: Sujan Baskota
   Date created: June 26, 2024
   Date modified: June 26, 2024
   <Start of modification section>
       2024-06-26 => Initial creation of Completion component to handle purchase completion and navigation.
   <End of modification section>
*/

import { useEffect } from "react";
import { useGlobalContext } from "../components/Context";

import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import axiosInstance from "../components/axiosInstance";

function Completion(props) {
  const navigate = useNavigate();
  let { pendingImage, setPendingImage, setUsergifs, messages, setMessages } =
    useGlobalContext();

  useEffect(() => {
    console.log(localStorage.getItem("pendingImage"));
    let pi = JSON.parse(localStorage.getItem("pendingImage"));
    console.log(pi);
    // let { id, url } = pi;
    setPendingImage(pi);
    localStorage.removeItem("pendingImage");
    let user = JSON.parse(localStorage.getItem("tempUser"));

    let ug = JSON.parse(localStorage.getItem("userGifs"));
    setUsergifs(ug);
    console.log(messages);
    localStorage.removeItem("messages");
    localStorage.removeItem("userGifs");

    const wrapper = async ({id, url}) => {
      try {
        const resp = await axiosInstance.post("/images/premium/", {
          user_id: user.id,
          image_id: id,
        });
        console.log(resp.data);
        setUsergifs(resp.data.images);
        console.log("=====================", userGifs);
      } catch (err) {
        console.error("Failed to delete image", err);
      }
    };

    wrapper(pi);
    const timeout = setTimeout(() => {
      navigate("/chat"); // Replace "/somewhere" with your desired route
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return <h1>Thank you! 🎉</h1>;
}

export default Completion;
