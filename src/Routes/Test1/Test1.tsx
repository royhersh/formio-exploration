import React from 'react';
import { Link } from 'react-router-dom';
import './Test1.css';

const Test1: React.FC = () => {
  return (
    <div className="test1">
      <h1>Test1 Page</h1>
      <p>This is the Test1 page content.</p>
      <div className="test1__links">
        <Link to="/" className="test1__link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Test1;
