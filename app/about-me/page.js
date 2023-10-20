// pages/quiz.js
"use client"; // pages/quiz.js
// pages/quiz.js
import { useState } from "react";
import { questions, getPersonality, quizMetadata } from "../data";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (scoreToAdd) => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setScore(score + scoreToAdd);
    } else {
      setScore(score + scoreToAdd);
      setShowResult(true);
    }
  };

  return (
    <div>
      <h1>{quizMetadata.title}</h1>
      <p>{quizMetadata.description}</p>

      {!showResult ? (
        <div>
          <h2>{questions[currentQuestionIndex].text}</h2>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleOptionClick(option.score)}>
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Your Personality: {getPersonality(score)}</h2>
      )}
    </div>
  );
}
