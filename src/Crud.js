import React, { useState } from 'react';
import './Crud.css';

const CrudApp = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    const updateTask = (index, newValue) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = newValue;
        setTasks(updatedTasks);
    };
    const deleteTask = (index) => {
        setShowPopup(true);
        setDeleteIndex(index);
    };

    const confirmDelete = () => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(deleteIndex, 1);
        setTasks(updatedTasks);
        setShowPopup(false);
    };

    const cancelDelete = () => {
        setShowPopup(false);
        setDeleteIndex(null);
    };

    return (
        <div className="container">
            <h1>Todo List Velinfo Tech</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={addTask}><i className="fas fa-plus"></i>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => updateTask(index, e.target.value)}
                        />
                        <button onClick={() => deleteTask(index)}><i className="fas fa-trash"></i>Delete</button>
                    </li>
                ))}
            </ul>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <p>Are you sure you want to delete this task?</p>
                        <button className="confirm" onClick={confirmDelete}>Yes</button>
                        <button className="cancel" onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrudApp;