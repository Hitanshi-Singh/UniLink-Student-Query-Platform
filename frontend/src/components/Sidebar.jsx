import { Link } from "react-router-dom";
import "./pages/feed.css";
import { Check } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      <div className="w-96 h-screen  text-white p-3 py-10 flex flex-col  items-center">
        <img src="" alt="" className="w-24 h-24 bg-cyan-300 rounded-full" />
        <h3>Hitanshi Singh</h3>
        <Link to={""}>Edit profile</Link>
        <div className="w-full border border-gray-100 rounded-md p-2 my-4">
          <div className="flex justify-between w-full p-2">
            <div className="flex w-full">
              <div className="p-1 border border-green-500 hover:bg-green-300 rounded-full mr-3"><Check /></div>
              <p>Questions answered</p>
            </div>
            <p>154</p>
          </div>
          <div className="flex justify-between w-full p-2">
            <div className="flex w-full">
            <div className="p-1 border border-green-500 hover:bg-green-300 rounded-full mr-3"><Check /></div>
            <p>Questions posted</p>
            </div>
            <p>154</p>
          </div>
          <div className="flex justify-between w-full p-2">
            <div className="flex w-full">
            <div className="p-1 border border-green-500 hover:bg-green-300 rounded-full mr-3"><Check /></div>
            <p>Total upvotes</p>
            </div>
            <p>154</p>
          </div>
          <div className="flex justify-between w-full p-2">
            <div className="flex w-full">
            <div className="p-1 border border-green-500 hover:bg-green-300 rounded-full mr-3"><Check /></div>
            <p>Current rank</p>
            </div>
            <p>154</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
