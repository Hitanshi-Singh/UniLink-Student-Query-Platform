import FeedExplore from "../FeedExplore";
import Sidebar from "../Sidebar";
import "./feed.css";

const Feed = () => {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <FeedExplore/>
    </div>
  );
};

export default Feed;
