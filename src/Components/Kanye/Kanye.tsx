import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Kanye.css';

const Kanye: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.kanye.rest/');
      const data = await response.json();
      setQuote(data.quote);
      // Generate a random pastel color
      const hue = Math.floor(Math.random() * 360);
      setBackgroundColor(`hsl(${hue}, 70%, 85%)`);
    } catch (error) {
      console.error('Error fetching Kanye quote:', error);
      setQuote('Failed to fetch quote');
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="kanye-quote" style={{ backgroundColor }}>
      <div className="quote-content">
        <p className="quote-text">{quote}</p>
        <button className="refresh-button" onClick={fetchQuote}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
};

export default Kanye;
