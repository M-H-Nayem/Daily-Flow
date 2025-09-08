// src/components/ExamGenerator.js
import React, { useState } from 'react';
import { FaWandMagicSparkles, FaSpinner, FaCheck, FaCircleQuestion } from 'react-icons/fa6';

const ExamGenerator = () => {
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState('mcq');
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const API_URL = 'https://daily-flow-server-six.vercel.app/qna';

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);

    try {
      const response = await fetch(`${API_URL}?type=${questionType}&difficulty=${difficulty}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions from the server.');
      }
      const data = await response.json();
      // Initialize selectedAnswer for each question
      const initializedQuestions = data.map(q => ({ ...q, selectedAnswer: '' }));
      setQuestions(initializedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Could not fetch questions. Please check the server connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach(q => {
      const userAnswer = q.selectedAnswer;
      const correctAnswer = q.correctAnswer;
      // Normalize comparison to be case-insensitive for short answers
      if (userAnswer && String(userAnswer).toLowerCase() === String(correctAnswer).toLowerCase()) {
        score++;
      }
    });
    setQuizScore(score);
    setShowResults(true);
  };

  const handleAnswerSelect = (qId, selected) => {
    const updatedQuestions = questions.map(q =>
      q._id === qId ? { ...q, selectedAnswer: selected } : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-[90vh] p-3 sm:p-6">
      <title>Daily Flow || Q & A</title>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-3 lg:p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Exam <span className="text-blue-600">Q&A</span> Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Generate practice questions to prepare for your exams.
        </p>

        {/* Input Form Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
          <form onSubmit={handleGenerate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* <div className="col-span-1">
                <label className="block text-gray-700 font-bold mb-2">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., World History, Biology"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                />
              </div> */}
              <div className="col-span-1">
                <label className="block text-gray-700 font-bold mb-2">Question Type</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                >
                  <option value="mcq">MCQs</option>
                  <option value="short_answer">Short Answers</option>
                  <option value="true_false">True/False</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 font-bold mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              
              className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform "
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FaWandMagicSparkles />
                  <span>Generate Questions</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Questions Section */}
        {questions.length > 0 && !showResults && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Practice Questions</h2>
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q._id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                  <p className="font-semibold text-lg mb-4 flex items-start space-x-2">
                    <FaCircleQuestion className="mt-1 text-blue-500 flex-shrink-0" />
                    <span>{q.questionText}</span>
                  </p>
                  {q.type === 'mcq' && (
                    <div className="space-y-2">
                      {q.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
                            ${q.selectedAnswer === option ? 'bg-blue-300 border-blue-400' : 'bg-gray-50 border-gray-200 hover:bg-gray-300'}`}
                          onClick={() => handleAnswerSelect(q._id, option)}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {q.type === 'true_false' && (
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 font-medium
                          ${q.selectedAnswer === 'True' ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                        onClick={() => handleAnswerSelect(q._id, 'True')}
                      >
                        True
                      </button>
                      <button
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 font-medium
                          ${q.selectedAnswer === 'False' ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                        onClick={() => handleAnswerSelect(q._id, 'False')}
                      >
                        False
                      </button>
                    </div>
                  )}
                  {q.type === 'short_answer' && (
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                      onChange={(e) => handleAnswerSelect(q._id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitQuiz}
              className="mt-6 w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaCheck />
              <span>Submit Answers</span>
            </button>
          </div>
        )}

        {/* Quiz Summary Section */}
        {showResults && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Quiz Complete!</h2>
            <p className="text-xl font-semibold text-gray-700 mb-6">
              You scored <span className="text-blue-600 text-2xl font-bold">{quizScore}</span> out of <span className="text-blue-600 text-2xl font-bold">{questions.length}</span>.
            </p>
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q._id} className="p-4 rounded-md text-left border border-gray-200">
                  <p className="font-medium">{q.questionText}</p>
                  <p className="text-sm mt-2">
                    Your Answer: <span className="font-semibold">{q.selectedAnswer || 'Not answered'}</span>
                  </p>
                  <p className="text-sm">
                    Correct Answer: <span className="font-semibold text-green-600">{q.correctAnswer}</span>
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setQuestions([]);
                setTopic('');
                setShowResults(false);
                setQuizScore(0);
              }}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Generate New Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamGenerator;