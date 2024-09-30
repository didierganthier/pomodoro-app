import { useEffect, useState } from 'react';
import './App.css';

const Clock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      const beep = document.getElementById('beep');
      beep.play();
      setIsSession(!isSession);
      setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength]);

  const resetClock = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsSession(true);
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const increaseBreak = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const decreaseBreak = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const increaseSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const decreaseSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div id="clock-app">
      <div id="break-session-controls">
        <div id="break-control">
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={decreaseBreak}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={increaseBreak}>+</button>
        </div>
        <div id="session-control">
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={decreaseSession}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={increaseSession}>+</button>
        </div>
      </div>
      
      <div id="timer">
        <h2 id="timer-label">{isSession ? 'Session' : 'Break'}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>

      <div id="controls">
        <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
        <button id="reset" onClick={resetClock}>Reset</button>
      </div>
      
      <audio id="beep" src="your-audio-source.mp3" />
    </div>
  );
};

export default Clock;