import React from 'react';
import { BiTime } from 'react-icons/bi'; // Importing a clock icon
import './questions.css';

const QuestionCard = ({ question, date }) => {
  return (
    <div className="question-card">
      <div className="question-text">{question}</div>
      <div className="question-footer">
        <a href="#" className="view-answer">
          View answer <span>&#8599;</span>
        </a>
        <div className="date">
          <BiTime className="clock-icon" /> {date}
        </div>
      </div>
    </div>
  );
};

const Questions = () => {
  const questions = [
    { id: 1, text: 'How does the virtual DOM work in React and what are its benefits?', date: 'January 14, 2024' },
    { id: 2, text: 'How does the virtual DOM work in React and what are its benefits?', date: 'January 14, 2024' },
    { id: 3, text: 'How does the virtual DOM work in React and what are its benefits?', date: 'January 14, 2024' },
    { id: 4, text: 'How does the virtual DOM work in React and what are its benefits?', date: 'January 14, 2024' },
    { id: 5, text: 'How does the virtual DOM work in React and what are its benefits?', date: 'January 14, 2024' },
  ];

  return (
    <div className="questions-container">
      <h1>History - Your Previously Asked Questions</h1>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question.text} date={question.date} />
      ))}
    </div>
  );
};

export default Questions;
