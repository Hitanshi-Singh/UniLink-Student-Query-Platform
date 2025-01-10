
/* eslint-disable react/prop-types */

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

const AnswerBox = ({ data }) => {
  const [vote, setVote] = useState("none");
  // if (data.length == 0) return;
  const { answer_content, answeredBy, createdAt, _id } = data;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getAnswerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/answers/${_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        console.error()
        const data = await response.json();
        console.log(data);
        console.log("I am in try block");
      } catch (err) {
        console.log(err);
      }
    };
    getAnswerData()
  });
  if (!token) {
    console.log("You need to login bro");
    return;
  }

  const updateUpvotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/answers/${_id}/upvote`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const { username } = answeredBy;
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the ISO string to a Date object
    return date.toLocaleString(); // Format it as a human-readable string
  };
  return (
    <>
      <div className="p-3 my-4 border border-white   rounded-lg">
        <div className="w-full flex justify-between p-3">
          <div className="flex ">
            <img
              src=""
              alt=""
              className="w-10 h-10 bg-gray-600 rounded-full mr-2"
            />
            <div className="flex flex-col text-xs">
              <h2>{username}</h2>
              <h3>{formatDate(createdAt)}</h3>
            </div>
          </div>
        </div>
        <div className="px-3">{answer_content}</div>
        <div className="flex gap-3 m-3">
          <ThumbsUp
            strokeWidth={0.75}
            className="cursor-pointer"
            fill={vote == "up" ? "white" : ""}
            onClick={() =>
              setVote((e) => {
                updateUpvotes()
                if (e == "up") return "none";
                else {
                  return "up";
                }
              })
            }
          />
          <ThumbsDown
            strokeWidth={0.75}
            className="cursor-pointer"
            fill={vote == "down" ? "white" : ""}
            onClick={() =>
              setVote((e) => {
                if (e == "down") return "none";
                else {
                  return "down";
                }
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default AnswerBox;
