import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import QuestionBox from "../QuestionBox";

const History = () => {
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("You need to login bro");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3000/api/questions/user/history",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json", // Optional: Add Content-Type if needed
              Authorization: `Bearer ${token}`, // Include token for auth
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setQuestionsData(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHistory();
  }, []);
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="overflow-y-scroll w-full">
          {questionsData &&
            questionsData.length > 0 &&
            questionsData.map((e, i) => {
              return <QuestionBox key={i} question={e} />;
            })}
        </div>
      </div>
    </>
  );
};

export default History;
