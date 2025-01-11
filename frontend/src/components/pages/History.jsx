import { useEffect } from "react";
import Sidebar from "../Sidebar";

const History = () => {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchHistory();
  });
  return (
    <>
      <Sidebar />
      <div></div>
    </>
  );
};

export default History;
