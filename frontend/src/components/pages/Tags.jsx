import React, { useState } from "react";
import "./Tags.css"; // Add your styles here
import plus from '../../assets/whiteplus.png'
import tick from '../../assets/tick.png'


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
  "Game Development"
];

const App = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

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
    <div className="container">
      <icon className="icon"></icon>
      <h1>Choose your Interests →</h1>
      <p>Select topics that interest you to personalize your feed</p>
      <p>Select up to 10 topics</p>
      <div className="topics-container">
        {topicsList.map((topic, index) => (
          <button
            className={`topic-button-class gradient-border ${isSelected(topic) ? 'selected' : ''}`} 
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
        <button className="skip-button">Skip</button>
        <button className="next-button" disabled={selectedTopics.length === 0}>Next</button>
      </div>
    </div>
  );
};

export default App;