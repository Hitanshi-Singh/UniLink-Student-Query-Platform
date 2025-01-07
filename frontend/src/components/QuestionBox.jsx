/* eslint-disable react/prop-types */
const QuestionBox = ({question}) => {
  const {content,owner,relatedTags,createdAt}=question;
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the ISO string to a Date object
    return date.toLocaleString(); // Format it as a human-readable string
  };


  return (
    <>
      <div className=" bg-gradient-to-r from-primary-color to-secondary-color p-0.5 text-white rounded-lg">
        <div className="w-full bg-black rounded-lg p-5">
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
             {
              relatedTags.map((e,i)=>{
                return  <button className="px-2 bg-green-200 rounded-sm h-min" key={i}>
                {e}
              </button>
              })
             }
             
            </div>
          </div>
          {/* question  */}
          <div className="m-2 font-bold text-lg">
            <div>{content}</div>
            {/* <div>sub question</div> */}
          </div>
          {/* answer */}
          <div className="p-3 my-4 border border-white   rounded-lg">
            {" "}
            <div className="w-full flex justify-between p-3">
              <div className="flex ">
                <img
                  src=""
                  alt=""
                  className="w-12 h-12 bg-gray-600 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <h2>name</h2>
                  <h3>date of posting</h3>
                </div>
              </div>
            </div>
            <div className="px-3">answer is here</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBox;
