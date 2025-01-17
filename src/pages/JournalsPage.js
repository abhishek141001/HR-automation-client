import React from 'react';
import { useLocation } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import SideNav from '../components/app-navigation/SideNav';

const JournalsPage = () => {
  const location = useLocation();
  const { name, email } = location.state || {}; // Destructure name and email from location.state

  return (
    <div className="flex h-screen">
      <SideNav name={name} email={email} />
      <div className="flex-grow overflow-auto">
        <TaskForm />
      </div>
    </div>
  );
};

export default JournalsPage;
