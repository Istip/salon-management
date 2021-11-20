import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// project imports
import Navigation from './components/Navigation';
import Users from './pages/Users';
import Today from './pages/Today';
import Calendar from './pages/Calendar';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Today />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
