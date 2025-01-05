import QuestionBox from "./QuestionBox";

const FeedExplore = () => {
  return (
    <div className="w-full  h-screen p-3 flex flex-col overflow-y-scroll gap-y-3">
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
    </div>
  );
};

export default FeedExplore;
