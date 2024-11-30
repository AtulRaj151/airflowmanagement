const express = require('express');
const cors = require('cors');
let tasks = [];

const app = express();
const port = 3010;

app.use(cors());


app.get('/tasks/add', (req, res)=> {
    const { taskId , text, priority } = req.query;
    tasks.push({ taskId, text, priority});
    return res.json({ tasks : tasks});
});

app.get('/tasks', (req, res)=> {
   return res.json({ tasks : tasks});
});

app.get('/tasks/sort-by-priority', (req, res) => {
      let newTasks = JSON.parse(JSON.stringify(tasks));
      newTasks.sort((item1, item2) => item1.priority - item2.priority);
      return res.json({ tasks : newTasks});
});

app.get('/tasks/edit-priority', (req, res) => {
         const { taskId, priority } = req.query;
        let newTasks =  tasks.filter((task) => task.taskId != taskId);
        let myTask = tasks.find((item) => item.taskId == taskId);
        newTasks.push({ taskId, text: myTask.text, priority}); 
        return res.json({ tasks: newTasks });    
});

app.get('/tasks/edit-text', (req, res) => {
     const { taskId, text } = req.query;
     let newTasks =  tasks.filter((task) => task.taskId != taskId);
        let myTask = tasks.find((item) => item.taskId == taskId);
        newTasks.push({ taskId, text: text, priority : myTask.priority }); 
        return res.json({ tasks: newTasks });  

});

app.get('/tasks/delete', (req, res) => {
  const { taskId } = req.query;
  let newTasks =  tasks.filter((task) => task.taskId != taskId);
     return res.json({ tasks: newTasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
     const { priority } = req.query;
     let newTask = tasks.filter((item) => item .priority === priority);
     return res.json({ tasks: newTask});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
