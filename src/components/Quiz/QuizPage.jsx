// src/components/QuizPage.js

import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../../data/quizData';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuiz(selectedDifficulty);
  }, [selectedDifficulty]);

  const loadQuiz = async (difficulty) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchQuizQuestions(difficulty);
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowScore(false);
    } catch (err) {
      setError("প্রশ্ন লোড করতে সমস্যা হয়েছে।");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">কুইজ জেনারেটর</h2>
      
      {showScore ? (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6 text-center">
          <div className="text-2xl font-bold mb-4">
            আপনি {questions.length}টির মধ্যে {score}টি সঠিক উত্তর দিয়েছেন!
          </div>
          <button onClick={() => loadQuiz(selectedDifficulty)} className="btn btn-primary mt-4">
            পুনরায় শুরু করুন
          </button>
        </div>
      ) : (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-700">
              প্রশ্ন {currentQuestionIndex + 1}/{questions.length}
            </h3>
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="select select-bordered"
            >
              <option value="easy">সহজ</option>
              <option value="medium">মাঝারি</option>
              <option value="hard">কঠিন</option>
            </select>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-semibold">{questions[currentQuestionIndex]?.question}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {questions[currentQuestionIndex]?.answerOptions.map((option, index) => (
              <button
                key={index}
                className="btn btn-block btn-outline"
                onClick={() => handleAnswerOptionClick(option.isCorrect)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;