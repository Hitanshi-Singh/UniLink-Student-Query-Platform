import { Link } from "react-router-dom";
import { useState } from "react";
import AddQuestionBox from "./AddQuestionBox";

const Header = () => {
  const [openAddAnswer, setOpenAddAnswer] = useState(false);

  return (
    <div className=" w-full px-6 py-3 flex justify-end text-white">
      <Link to={"/user-history"}>
        <button className="p-2 mx-4 px-3 cursor-pointer bg-gradient-to-r from-primary-color to-secondary-color border-none text-sm text-center">
          History
        </button>
      </Link>
      <button className="p-2 mx-4 px-3 cursor-pointer bg-gradient-to-r from-primary-color to-secondary-color border-none text-sm text-center">
        Your feed
      </button>
      <button className="p-2 mx-2 px-3 cursor-pointer bg-gradient-to-r from-primary-color to-secondary-color border-none text-sm text-center" onClick={()=>setOpenAddAnswer(true)}>
        + Ask a Question
      </button>
      {openAddAnswer && (
        <div className="absolute bg-black rounded-lg">
          <AddQuestionBox closeAnswer={() => setOpenAddAnswer(false)} />
        </div>
      )}
    </div>
  );
};

export default Header;
