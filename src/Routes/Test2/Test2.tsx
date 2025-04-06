import React from 'react';
import { Link } from 'react-router-dom';
import './Test2.css';

const Test2: React.FC = () => {
  return (
    <div className="test2">
      <h1>Test2 Page</h1>
      <p>This is the Test2 page content.</p>
      <div className="test2__links">
        <Link to="/" className="test2__link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Test2;
