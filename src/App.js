import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JournalsPage from './pages/JournalsPage';
import SlackAuthPage from './pages/SlackAuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/SlackAuth" element={<SlackAuthPage />} />
        {/* Future routes can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
