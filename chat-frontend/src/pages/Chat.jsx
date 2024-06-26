import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../components/Context";
import { sendMessage as message } from "../components/apicalls";
import axios from "axios";
import axiosInstance from "../components/axiosInstance";

function Chat() {
  const { user, setUser } = useGlobalContext();
  console.log(user);
  const navigate = useNavigate();
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  const { userGifs, setUsergifs, pendingImage, setPendingImage } =
    useGlobalContext();
  const { gifUrls } = useGlobalContext();
  const [myGifs, setMygifs] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  //   console.log(user.username);

  console.log("messsages", localStorage.getItem("messages"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    console.log(user);

    const ws = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      //   ws.send(JSON.stringify({ message: "Hello from client" }));
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      const msg = JSON.parse(event.data).message;
      const username = msg.username;
      if (msg.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { username, content: msg.message, isGif: false },
        ]);
      }
      console.log(message, username);

      if (msg.gif)
        // const username = JSON.parse(event.data).username;
        // console.log(username)
        setMessages((prevMessages) => [
          ...prevMessages,
          { username, content: msg.gif, isGif: true },
        ]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user, history]);

  const sendMessage = async (gifurl) => {
    // console.log(user);
    // console.log(user.username);
    console.log("sends");
    if (socket && input.trim()) {
      try {
        console.log(
          "should be this",
          JSON.stringify({ message: input, username: user.username })
        );
        socket.send(
          JSON.stringify({
            message: { message: input, username: user.username },
            username: user.username,
          })
        );
      } catch (err) {
        console.log("couldn't socket");
      }
      try {
        await message({ content: input, username: user.username });
      } catch (err) {
        console.log("couldn't");
      }
      console.log({ content: input, username: user.username });
      setInput("");
    }
    if (gifurl) {
      try {
        socket.send(
          JSON.stringify({
            message: { gif: gifurl, username: user.username },
            username: user.username,
          })
        );
      } catch (err) {
        console.log("couldn't socket");
      }
    }
  };

  const buyGif = async (id, url) => {
    console.log({ id, url });
    localStorage.setItem("pendingImage", JSON.stringify({ id, url }));
    console.log(localStorage.getItem("pendingImage"));
    localStorage.setItem("userGifs", JSON.stringify(userGifs));
    localStorage.setItem("messages", JSON.stringify(messages));
    localStorage.setItem("tempUser", JSON.stringify(user));
    // setPendingImage()
    navigate("/payment");
  };
  const sendGIf = async (id, url) => {
    console.log({
      user_id: user.id,
      image_id: id,
    });
    try {
      const resp = await axiosInstance.post("/images/premium/remove", {
        user_id: user.id,
        image_id: id,
      });
      setUsergifs(resp.data.images);
      sendMessage(url);
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-200 p-20">
      {user?.username && (
        <div className="absolute top-10 left-10 text-3xl">{user.username}</div>
      )}
      <div className="flex-1 flex flex-col gap-2 h-full max-w-[90%]">
        <h1>Premium Gifs</h1>
        <div className="flex flex-wrap w-full gap-2 ">
          {gifUrls.map((gif, index) => (
            <div
              className=" w-[10rem] h-[8rem] cursor-pointer object-contain overflow-hidden"
              key={index}
              onClick={() => buyGif(gif._id, gif.url)}
            >
              <img
                src={gif.url}
                alt={`Uploaded ${index}`}
                className=" h-auto border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
        <h1>My gifs</h1>
        <div className="flex flex-wrap w-full gap-2 ">
          {userGifs?.map((gif, index) => (
            <div
              className=" w-[10rem] h-[8rem] cursor-pointer object-contain overflow-hidden"
              key={index}
              onClick={() => sendGIf(gif.image_id, gif.image)}
            >
              <img
                src={gif.image}
                alt={`Uploaded ${index}`}
                className=" h-auto border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex-1 max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-6 bg-blue-500 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold text-center">Chat Application</h1>
        </div>
        <div className="p-4 h-80 overflow-y-auto bg-gray-100">
          {messages?.map((msg, index) => {
            console.log(msg.username === user.username);
            console.log(msg);
            return msg.username !== user.username ? (
              !msg.isGif ? (
                <div
                  key={index}
                  className="p-2 bg-white rounded mr-10 mb-2 shadow"
                >
                  {msg.content}
                </div>
              ) : (
                <div
                  key={index}
                  className="p-2 bg-white rounded mr-10 mb-2 shadow"
                >
                  <img src={msg.content} alt="" />
                </div>
              )
            ) : !msg.isGif ? (
              <div
                key={index}
                className="p-2 bg-blue-600 text-white ml-10 rounded mb-2 shadow"
              >
                {msg.content}
              </div>
            ) : (
              <div
                key={index}
                className="p-2 bg-blue-600 text-white ml-10 rounded mb-2 shadow"
              >
                <img src={msg.content} alt="" />
              </div>
            );
          })}
        </div>
        <div className="p-4 bg-white rounded-b-lg border-t flex">
          <input
            type="text"
            className="flex-grow rounded-l-lg py-2 px-4 border border-gray-300 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      {/* <div className="flex-1 justify-center items-center">
        <h1>Buy</h1>
      </div> */}
    </div>
  );
}

export default Chat;
