import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Routes/Home/Home';
import FormBuilder from './Routes/FormBuilder/FormBuilder';
import FormRenderer from './Routes/FormRenderer/FormRenderer';

// Import your components here
// import Home from './Home/Home';
// import About from './About/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <nav className="app__nav">
          <ul className="app__nav-list">
            <li>
              <Link to="/" className="app__nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/form-builder" className="app__nav-link">
                Form Builder
              </Link>
            </li>
            <li>
              <Link to="/form-renderer" className="app__nav-link">
                Form Renderer
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/form-renderer" element={<FormRenderer />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
