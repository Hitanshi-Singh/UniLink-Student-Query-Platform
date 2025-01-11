import FeedExplore from "../FeedExplore";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./feed.css";

const Feed = () => {
  return (
    <div className="flex w-[98vw]">
      <Sidebar />
      <div className="w-full ">
        <Header />
        <FeedExplore />
      </div>
    </div>
  );
};

export default Feed;
