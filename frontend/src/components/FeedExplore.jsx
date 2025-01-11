import { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";

const FeedExplore = () => {
  const [questionsArray, setQuestionsArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 
      if(!token){
        console.log("You need to login bro");
        return;
      }
      // console.log(token)
      try{
        const res = await fetch("http://localhost:3000/api/questions/questions",{
          method:"GET",
          headers: {
            'Content-Type': 'application/json', // Optional: Add Content-Type if needed
            'Authorization': `Bearer ${token}`, // Include token for auth
          },
        });
        const data=await res.json();
        
      setQuestionsArray(data.data);
      // console.log(data.data);
      }
      catch(err){
        console.log(err)
      }
      
    };
    fetchData();
  },[]);
  
  return (
    <div className="w-full  h-screen p-3 flex flex-col overflow-y-scroll gap-y-3 ">
      {
        questionsArray.map((ques,index)=>{
          return <QuestionBox question={ques} key={index}/>
        })
      }
    </div>
  );
};

export default FeedExplore;
