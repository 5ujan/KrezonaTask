import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../components/Context";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const {gifUrls, setGifUrls} = useGlobalContext();
 
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    if (image) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/images/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // setGifUrls((prevGifUrls) => [
        //   ...prevGifUrls,
        //   ...response.data.gif_urls,
        // ]);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/images/get"
        );
        setGifUrls(response.data.gif_urls);
        console.log(response.data.gif_urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      } catch (error) {}
      console.error("Error uploading image:", error);
    }
  };

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
    <div className="flex flex-col items-center p-4 max-w-[80vw] mx-auto">
      <input
        type="file"
        onChange={handleImageChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleUpload}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add gifs
      </button>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-wrap w-full gap-2 ">
          {gifUrls.map((gif, index) => (
            <div
              className=" max-w-[10rem] min-w[8rem] overflow-hidden"
              key={gif._id}
            >
              <img
                src={gif.url}
                alt={`Uploaded ${index}`}
                className=" h-auto border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
