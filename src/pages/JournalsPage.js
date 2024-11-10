// src/pages/JournalsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const JournalsPage = () => {
  const location = useLocation();
  const { name, email } = location.state || {};  // Destructure name and email from location.state

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
      <p>Your email: {email}</p>
      <p>Here are your journal entries:</p>
      {/* Display journal entries here */}
      <TaskForm/>
    </div>
  );
};

export default JournalsPage;
