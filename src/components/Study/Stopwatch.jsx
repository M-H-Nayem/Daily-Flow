// src/components/Stopwatch.js
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map(v => v < 10 ? `0${v}` : v)
      .join(':');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Stopwatch</h2>
      <div className="text-2xl sm:text-3xl font-mono text-gray-800 mb-6">
        {formatTime(time)}
      </div>
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <FaPlay />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <FaPause />
            <span>Pause</span>
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <FaStop />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;