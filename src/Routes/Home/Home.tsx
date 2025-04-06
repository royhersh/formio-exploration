import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Formio Exploration</h1>
      <p>This is the home page of your application.</p>
      <div className="home__links">
        <Link to="/test1" className="home__link">
          Go to Test1
        </Link>
        <Link to="/test2" className="home__link">
          Go to Test2
        </Link>
      </div>
    </div>
  );
};

export default Home;
