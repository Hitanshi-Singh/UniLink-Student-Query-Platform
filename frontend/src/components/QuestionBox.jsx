import { useEffect, useState } from "react";
import AnswerBox from "./AnswerBox";
import AddAnswerBox from "./AddAnswerBox";

/* eslint-disable react/prop-types */
const QuestionBox = ({ question }) => {
  const { content, owner, relatedTags, createdAt, _id } = question;
  const [answerData, setAnswerData] = useState([]);
  const [openAddAnswer, setOpenAddAnswer] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [addedAnswer,setAddedAnswer]=useState(false);
  useEffect(() => {
    console.log(question)
    const fetchAnswers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/answers/questions/${_id}/answers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json", // Optional: Add Content-Type if needed
            },
          }
        );
        const data = await response.json();
        // console.log(data)
        setAnswerData(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnswers();
  }, [_id,addedAnswer]);
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the ISO string to a Date object
    return date.toLocaleString(); // Format it as a human-readable string
  };
  // const[currentAnswer,setCurrentAnswer]=useState("");

  return (
    <>
      <div className=" bg-gradient-to-r from-primary-color to-secondary-color p-0.5 text-white rounded-lg">
        <div className="w-full bg-black rounded-lg p-5 flex flex-col">
          {/* header */}
          <div className="w-full flex justify-between">
            <div className="flex ">
              <img
                src=""
                alt=""
                className="w-12 h-12 bg-gray-600 rounded-full mr-2"
              />
              <div className="flex flex-col mx-2 text-sm">
                <h2>@{owner.username}</h2>
                <h3>{formatDate(createdAt)}</h3>
              </div>
            </div>
            <div className="flex gap-x-1 items-center">
              {relatedTags&&relatedTags.length>0&&relatedTags.map((e, i) => {
                // console.log(relatedTags)
                return (
                  <button
                    className="px-2 bg-purple-700 rounded-sm h-min"
                    key={i}
                  >
                   {e?.name || "Unnamed Tag"}
                  </button>
                );
              })}
            </div>
          </div>
          {/* question  */}
          <div className="m-2 font-bold text-lg">
            <div>{content}</div>
            {/* <div>sub question</div> */}
          </div>
          {/* answer */}
          {answerData.length > 0 &&
            (showAllAnswers ? (
              answerData.map((e, i) => <AnswerBox data={e} key={i} />)
            ) : (
              <AnswerBox data={answerData[0]} />
            ))}
          {
            answerData.length>0&&<button
            onClick={() => setShowAllAnswers(!showAllAnswers)}
            className="w-28 p-2 px-3 cursor-pointer  border border-secondary-color text-sm text-center "
          >
            {showAllAnswers ? "show less " : "show more"}
          </button>
          }

          {!openAddAnswer ? (
            <button
              className="self-end p-2 px-3 cursor-pointer bg-gradient-to-r from-primary-color to-secondary-color border-none text-sm text-center"
              onClick={() => setOpenAddAnswer(true)}
            >
              Add answer
            </button>
          ) : (
            <AddAnswerBox
              closeAnswer={() => setOpenAddAnswer(false)}
              id={_id}
              onAdd={setAddedAnswer}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionBox;
