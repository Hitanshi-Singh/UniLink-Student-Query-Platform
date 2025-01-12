import "./Tags.css"; // Add your styles here
import plus from "../../assets/whiteplus.png";
import tick from "../../assets/tick.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Topic list
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

const Tags = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("");
  const navigate=useNavigate()

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
    console.log(selectedTopics);
    try {
      const deptObj = {
        dept_name: dept,
        dept_head: "Srinath Sir",
        dept_email: "jss@univ.com",
        total_students: 4,
      };
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          fullName,
          email,
          username,
          password,
          dept: deptObj,
          subscribedTags: selectedTopics,
        }
      );
      console.log(response)
      console.log(response?.data?.message);
      navigate('/login')
    } catch (error) {
      console.error(
        "Error submitting user data:",
        error?.response?.data || error.message
      );
    }
  };

  const toggleTopic = (topic) => {
    console.log(selectedTopics);
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((item) => item !== topic));
    } else if (selectedTopics.length < 10) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const isSelected = (topic) => selectedTopics.includes(topic);

  return (
    <div className="container">
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
          onClick={submitUserData}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tags;
