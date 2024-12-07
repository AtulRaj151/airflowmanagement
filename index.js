const express = require('express');
const cors = require('cors');
let tasks = [];

const app = express();
const port = 3000;

app.use(cors());

app.get('/tasks/add', (req, res) => {
    const { taskId, text, priority } = req.query;
    tasks.push({ taskId: parseInt(taskId), text, priority: parseInt(priority) });
    return res.json({ tasks: tasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.get('/tasks', (req, res) => {
    return res.json({ tasks: tasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.get('/tasks/sort-by-priority', (req, res) => {
    let newTasks = JSON.parse(JSON.stringify(tasks));
    newTasks.sort((item1, item2) => item1.priority - item2.priority);
    return res.json({ tasks: newTasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.get('/tasks/edit-priority', (req, res) => {
    const { taskId, priority } = req.query;
    let newTasks = tasks.filter((task) => task.taskId !== parseInt(taskId));
    let myTask = tasks.find((item) => item.taskId === parseInt(taskId));
    newTasks.push({ taskId: myTask.taskId, text: myTask.text, priority: parseInt(priority) });
    tasks = newTasks; // Update the main tasks array
    return res.json({ tasks: tasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.get('/tasks/edit-text', (req, res) => {
    const { taskId, text } = req.query;
    let newTasks = tasks.filter((task) => task.taskId !== parseInt(taskId));
    let myTask = tasks.find((item) => item.taskId === parseInt(taskId));
    newTasks.push({ taskId: myTask.taskId, text, priority: myTask.priority });
    tasks = newTasks; // Update the main tasks array
    return res.json({ tasks: tasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.get('/tasks/delete', (req, res) => {
    const { taskId } = req.query;
    tasks = tasks.filter((task) => task.taskId !== parseInt(taskId));
    return res.json({ tasks: tasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.get('/tasks/filter-by-priority', (req, res) => {
    const { priority } = req.query;
    let newTasks = tasks.filter((item) => item.priority === parseInt(priority));
    return res.json({ tasks: newTasks.map(task => ({
        taskId: parseInt(task.taskId),
        text: task.text,
        priority: parseInt(task.priority)
    })) });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
