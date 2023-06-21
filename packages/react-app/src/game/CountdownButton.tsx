import React, { useState, useEffect } from 'react';
import './CountdownButton.css';

const CountdownButton = () => {
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isCounting && countdown === 0) {
      var div = document.getElementById('count');
      div!.style.zIndex = '-1';
      setIsCounting(false);
    }
  }, [isCounting, countdown]);

  const handleStart = () => {
    setCountdown(3);
    setIsCounting(true);
  };

  return (
    <div id='count' className="countdown-container">
      {isCounting && (
        <button className="countdown-button">
          <div className="countdown-overlay">
            {countdown}
          </div>
        </button>
      )}
    </div>
  );
};

export default CountdownButton;
