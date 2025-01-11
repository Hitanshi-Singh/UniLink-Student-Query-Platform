/* eslint-disable react/prop-types */

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

const AnswerBox = ({ data }) => {
  const [vote, setVote] = useState("none");
  const [replybox, setReplybox] = useState(false);
  const [reply, setReply] = useState("");

  const { answer_content, answeredBy, createdAt, _id, upvotes } = data;
  const [upvote, setUpvote] = useState(upvotes);
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("You need to login bro");
    return;
  }

  const postReply = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/reply/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: reply,
          answerId: _id,
        }),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Log the response data
      console.log("I am in the try block");
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };
  

  const updateUpvotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/answers/${_id}/upvote`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        <div className="flex justify-between items-center">
          <div className="flex gap-3 m-3">
            <ThumbsUp
              strokeWidth={0.75}
              className="cursor-pointer"
              fill={vote == "up" ? "white" : ""}
              onClick={() => {
                updateUpvotes();
                setUpvote((prev) => prev + 1);

                return setVote((e) => {
                  if (e == "up") return "none";
                  else {
                    return "up";
                  }
                });
              }}
            />
            {upvote}
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
          {replybox ? (
            <div className="flex">
              <button
                className="flex justify-center items-center px-3 h-8 border border-red-600 rounded-full "
                onClick={() => setReplybox(false)}
              >
                x
              </button>
              <input
                type="text"
                placeholder="enter reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)
                  
                }
                className="bg-black p-2 mx-3"
              />
              <button className="px-2 py-2 h-10" onClick={postReply}>
                Submit reply
              </button>
            </div>
          ) : (
            <div>
              <button
                className="px-3 h-8 border-none "
                onClick={() => setReplybox(true)}
              >
                Add replies
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerBox;
