import React, { useState } from 'react';
import "../src/App.css"
import { Paper, TextField, Button, Checkbox } from '@material-ui/core';
import Login from './login';

const App = () => {

    const [login, setLogin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask.trim() !== '') {
      const newTask = { task: currentTask, completed: false };
      setTasks([...tasks, newTask]);
      setCurrentTask('');
    }
  };

  const handleChange = (event) => {
    setCurrentTask(event.target.value);
  };

  const handleUpdate = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
   login==false? <Login setLogin={setLogin}/>:
    <div className="App">
    <Button style={{marginLeft:'93vw', marginTop:'5px'}}
            color="secondary"
            variant="contained"  onClick={()=>{setLogin(false)}}>Log Out</Button>
      <Paper elevation={5} className="container">
  
        <div className="content ">
          <h2>TO-DO LIST</h2>
          <h2>TO-DO LIST</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex formContainer"
          style={{ margin: '15px 0' }}
        >
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '70%' }}
            value={currentTask}
            required={true}
            onChange={handleChange}
            placeholder="Add New TO-DO"
          />
          <Button
            style={{ height: '40px', margin: '10px' }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <div>
          {tasks.map((task, index) => (
            <div draggable="true" style={{ padding: '10px' }} key={task._id}>
              <Paper className="flex task_container">
                <Checkbox
                  checked={task.completed}
                  onClick={() => handleUpdate(task._id)}
                  color="primary"
                />
                <div
                  className={
                    task.completed ? 'task line_through' : 'task'
                  }
                >
                  {task.task}
                </div>
                <Button onClick={() => handleDelete(task._id)} color="secondary">
                  delete
                </Button>
              </Paper>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default App;
