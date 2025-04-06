import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';

// Import your components here
// import Home from './Home/Home';
// import About from './About/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
