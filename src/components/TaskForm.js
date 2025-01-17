import React, { useState, MouseEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Task Input Component
function TaskInput({ task, onTaskChange, isTodo, onTodoChange, isUrgent }) {
  return (
    <div className="task-input mb-6">
      {isTodo ? (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-6 w-6 text-indigo-600 rounded"
            checked={task.completed}
            onChange={(e) => onTodoChange(e.target.checked)}
          />
          <textarea
            className="w-full p-4 h-20 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-600"
            value={task.text}
            onChange={(e) => onTaskChange(e.target.value)}
            placeholder="Enter your To-Do task"
            required
          />
        </div>
      ) : (
        <textarea
          className="w-full p-4 h-32 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-600"
          value={task.text}
          onChange={(e) => onTaskChange(e.target.value)}
          placeholder="Enter your task"
          required
        />
      )}
      {isUrgent && <span className="text-red-600 font-semibold ml-2">Urgent</span>}
    </div>
  );
}

// Task Description Component
function TaskDescription({ description, onDescriptionChange }) {
  return (
    <div className="task-description mb-6">
      <textarea
        className="w-full p-4 h-28 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-600"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Add a description"
      />
    </div>
  );
}

// DateSelector Component for Start and End Dates
function DateSelector({ label, selectedDate, onChange }) {
  return (
    <div className="date-selector mb-6">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
        className="w-full p-3 border rounded-lg shadow-md text-gray-600 focus:ring-2 focus:ring-indigo-600"
        placeholderText={`Select ${label.toLowerCase()}`}
      />
    </div>
  );
}

// Menu Component with Hover Complexity Option
function Menu({ position, onSelect }) {
  const [hoveredOption, setHoveredOption] = useState(false);

  return (
    <ul
      className="context-menu bg-white shadow-lg rounded-md border border-gray-200 py-3 w-56 text-sm absolute"
      style={{ top: position.y + 10, left: position.x + 10 }} // Adjusted menu position
    >
      <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('setStartTime')}>
        Set Start Time
      </li>
      <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('setEndTime')}>
        Set End Time
      </li>
      <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('changeToTodo')}>
        Convert to To-Do
      </li>
      <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('addDescription')}>
        Add Description
      </li>
      <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('setUrgency')}>
        Set Urgency
      </li>
      <li
        className="py-2 px-4 hover:bg-indigo-100 cursor-pointer relative"
        onMouseEnter={() => setHoveredOption(true)}
        onMouseLeave={() => setHoveredOption(false)}
      >
        Task Complexity
        {hoveredOption && (
          <ul className="bg-white shadow-lg rounded-md border absolute left-full top-0 w-32">
            <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('complexity', 'easy')}>
              Easy
            </li>
            <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('complexity', 'medium')}>
              Medium
            </li>
            <li className="py-2 px-4 hover:bg-indigo-100 cursor-pointer" onClick={() => onSelect('complexity', 'hard')}>
              Hard
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
}

// Project Selector Component
function ProjectSelector({ selectedProject, onProjectChange }) {
  const [newProject, setNewProject] = useState('');

  return (
    <div className="project-selector mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Select Project</label>
      <select
        className="w-full p-3 border rounded-lg shadow-md text-gray-600 focus:ring-2 focus:ring-indigo-600"
        value={selectedProject}
        onChange={(e) => onProjectChange(e.target.value)}
      >
        <option value="log">Log</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="new">+ Create New</option>
      </select>
      {selectedProject === 'new' && (
        <input
          type="text"
          className="w-full p-3 border rounded-lg shadow-md mt-2 text-gray-600 focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter new project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          onBlur={() => onProjectChange(newProject)}
        />
      )}
    </div>
  );
}

// TaskForm Component
function TaskForm() {
  const [task, setTask] = useState({ text: '', completed: false });
  const [description, setDescription] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [isTodo, setIsTodo] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isTaskInputVisible, setIsTaskInputVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState('log');
  const [taskComplexity, setTaskComplexity] = useState('medium');

  const handleLeftClick = () => {
    if (!isTaskInputVisible) setIsTaskInputVisible(true);
    if (isMenuVisible) setIsMenuVisible(false);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setIsMenuVisible(true);
  };

  const handleMenuSelect = (option, value) => {
    switch (option) {
      case 'setStartTime':
        setShowStartDate(true);
        break;
      case 'setEndTime':
        setShowEndDate(true);
        break;
      case 'changeToTodo':
        setIsTodo(true);
        break;
      case 'addDescription':
        setIsDescriptionVisible(true);
        break;
      case 'setUrgency':
        setIsUrgent(true);
        break;
      case 'complexity':
        setTaskComplexity(value || 'medium');
        break;
      default:
        break;
    }
    setIsMenuVisible(false);
  };

  const handleTaskSubmit = async (taskDetails) => {
    try {
      const response = await fetch('http://localhost:3000/api/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskDetails),
      });

      if (response.ok) {
        // Handle success if needed
      } else {
        // Handle failure if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleTaskSubmit({
      task,
      description,
      startDate,
      endDate,
      isTodo,
      isUrgent,
      selectedProject,
      taskComplexity,
    });

    // Reset state after submission
    setTask({ text: '', completed: false });
    setDescription('');
    setStartDate(null);
    setEndDate(null);
    setIsTodo(false);
    setIsUrgent(false);
    setIsDescriptionVisible(false);
    setIsTaskInputVisible(false);
  };

  return (
    <div className="flex min-h-screen">


      <div
        className="task-form bg-gray-100 p-8 rounded-lg shadow-2xl relative flex-1"
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
      >
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          {/* Project Selector */}
          <ProjectSelector selectedProject={selectedProject} onProjectChange={setSelectedProject} />

          {isTaskInputVisible && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <TaskInput
                task={task}
                onTaskChange={(text) => setTask({ ...task, text })}
                isTodo={isTodo}
                onTodoChange={(completed) => setTask({ ...task, completed })}
                isUrgent={isUrgent}
              />

              {isDescriptionVisible && <TaskDescription description={description} onDescriptionChange={setDescription} />}

              {showStartDate && <DateSelector label="Start Date" selectedDate={startDate} onChange={setStartDate} />}
              {showEndDate && <DateSelector label="End Date" selectedDate={endDate} onChange={setEndDate} />}
            </form>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Submit Task
            </button>
          </div>
        </div>
      </div>

      {isMenuVisible && <Menu position={menuPosition} onSelect={handleMenuSelect} />}
    </div>
  );
}

export default TaskForm;
