/* eslint-disable react/prop-types */

import { useState } from "react";

const AddQuestionBox = ({ closeAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState("");
//   const fetchData = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("You need to login bro");
//       return;
//     }
//     // console.log(token);
     
//   };
  const onAnswerChange = (e) => {
    setAnswer(e.target.value);
  };
  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("You need to login bro");
      return;
    }
    
    const tagsArray=tags
    .toLowerCase() // Convert the string to lowercase
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .trim() // Trim leading/trailing spaces
    .split(/\s+/)
    console.log(tagsArray)
    try {
      const response = await fetch(
        "http://localhost:3000/api/questions/addQuestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Optional: Add Content-Type if needed
            'Authorization': `Bearer ${token}`, // Include token for auth
          },
          body: JSON.stringify({
            content: answer,
            relatedTags: tagsArray
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full border border-white flex flex-col items-center p-3">
      <button
        onClick={closeAnswer}
        className="self-end w-8 h-8 border border-red-600 rounded-lg text-red-600 hover:bg-red-500/20 hover:border-red-600 "
      >
        X
      </button>
      <input
        type="text"
        name="Answer"
        id=""
        placeholder="Enter your answer"
        className="p-2 bg-black m-5 border border-gray-600 rounded-lg w-full"
        value={answer}
        onChange={(e) => {
          onAnswerChange(e);
        }}
      />
      <input
        type="text"
        name="Answer"
        id=""
        placeholder="Enter your tags"
        className="p-2 bg-black m-5 border border-gray-600 rounded-lg w-full"
        value={tags}
        onChange={(e) => {
          setTags(e.target.value);
        }}
      />
      <button
        className="w-28 p-2 px-3 cursor-pointer bg-gradient-to-r from-primary-color to-secondary-color border-none text-sm text-center "
        type="submit"
        onClick={() => onSubmit()}
      >
        Submit
      </button>
    </div>
  );
};

export default AddQuestionBox;
