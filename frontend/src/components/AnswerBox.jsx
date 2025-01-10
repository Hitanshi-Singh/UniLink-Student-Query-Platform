/* eslint-disable react/prop-types */

const AnswerBox = ({data}) => {
  if(data.length==0) return
  const {answer_content,answeredBy,createdAt}=data;
  const {username}=answeredBy;
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the ISO string to a Date object
    return date.toLocaleString(); // Format it as a human-readable string
  };
  return (
    <><div className="p-3 my-4 border border-white   rounded-lg">
    <div className="w-full flex justify-between p-3">
      <div className="flex ">
        <img
          src=""
          alt=""
          className="w-12 h-12 bg-gray-600 rounded-full mr-2"
        />
        <div className="flex flex-col">
          <h2>{username}</h2>
          <h3>{formatDate(createdAt)}</h3>
        </div>
      </div>
    </div>
    <div className="px-3">{answer_content}</div>
  </div></>
  )
}

export default AnswerBox