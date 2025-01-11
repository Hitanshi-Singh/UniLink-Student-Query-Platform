import "./Tags.css"; // Add your styles here
import plus from "../../assets/whiteplus.png";
import tick from "../../assets/tick.png";
import { useEffect, useState } from "react";
import axios from "axios";

//shd take tags from database
const topicsList = [
  "System Design",
  "App Development",
  "Binary Search Tree",
  "DSA",
  "Web Development",
  "DevOps",
  "Artificial Intelligence",
  "React",
  "Machine Learning",
  "Data Science",
  "Semester Exams",
  "Cloud Computing",
  "Full Stack",
  "Frontend ",
  "Backend ",
  "Networking",
  "Cybersecurity",
  "Blockchain",
  "Game Development",
];

const App = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  //userData state variables
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("");
  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setProfilePic(parsedData.profilePic);
      setFullName(parsedData.fullName);
      setEmail(parsedData.email);
      setUsername(parsedData.username);
      setPassword(parsedData.password);
      setDept(parsedData.dept);
    }
  }, []);
  const submitUserData = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/users/register",
      {
        fullName,
        email,
        username,
        password,
        dept,
        subscribedTags: selectedTopics,
      }
    );
    console.log(response?.data?.message);
  };

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      // Deselect topic
      setSelectedTopics(selectedTopics.filter((item) => item !== topic));
    } else if (selectedTopics.length < 10) {
      // Select topic
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const isSelected = (topic) => selectedTopics.includes(topic);

  return (
    <div className="container ">
      {/* <icon className="icon"></icon>
       */}
      <h1 className="h1">Choose your Interests →</h1>
      <p>Select topics that interest you to personalize your feed</p>
      <p>Select up to 10 topics</p>
      <div className="topics-container">
        {topicsList.map((topic, index) => (
          <button
            className={`topic-button-class gradient-border ${
              isSelected(topic) ? "selected" : ""
            }`}
            key={index}
            id={`topic-button-${isSelected(topic) ? "selected" : ""}`}
            onClick={() => toggleTopic(topic)}
          >
            {topic}
            <img
              className="check"
              src={isSelected(topic) ? tick : plus}
              alt=""
            />
          </button>
        ))}
      </div>
      <div className="actions">
        <button
          className="skip-button"
          onClick={() => {
            setSelectedTopics([]);
            submitUserData();
          }}
        >
          Skip
        </button>
        <button
          className="next-button"
          disabled={selectedTopics.length === 0}
          onClick={() => submitUserData}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
