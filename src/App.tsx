import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Routes/Home/Home';
import FormBuilder from './Routes/FormBuilder/FormBuilder';
import Test2 from './Routes/Test2/Test2';

// Import your components here
// import Home from './Home/Home';
// import About from './About/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
