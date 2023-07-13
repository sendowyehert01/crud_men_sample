const express = require('express');
const app = express();
const path = require('path');
const TaskModel = require("./models/TaskModel.js");
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/todoList', { useNewUrlParser: true , useUnifiedTopology: true })
.then (() => {
    console.log("CONNECTED!")
}) . catch ((err) => {
    console.log("ERROR");
    console.log(err);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req,res) => { 
    res.render('home');
})

// All Task are SHOWN HERE! ------------------------------
app.get('/tasks', async (req,res) => {
    const todos = await TaskModel.find({});
    res.render('task', { todos });
})

// Adding a TASK -----------------------------------------
app.get('/tasks/addtask', (req,res) => {
    res.render('addtask');
})

app.post('/tasks', async (req,res) => {
    const newTodos = new TaskModel(req.body);
    await newTodos.save();
    res.redirect('/tasks');
})

// Editting a TASK ---------------------------------------
app.get('/tasks/:id', async (req,res) => {
    const { id } = req.params;
    const taskId = await TaskModel.findById(id);
    console.log(taskId);
    res.render('task', { taskId }); 
})

app.get('/tasks/:id/edit', async (req,res) => {
    const { id } = req.params;
    const taskId = await TaskModel.findById(id);
    res.render('edittask', { taskId }); 
})

app.put('/tasks/:id',async (req, res) => {
    const { id } = req.params;
    const editedTask = await TaskModel.findByIdAndUpdate(id, req.body, { runValidators: true});
    res.redirect('/tasks');
})

// Deleting a TASK ---------------------------------------
app.delete('/tasks/:id', async (req,res) => {
    const { id } = req.params;
    const deletedTaskId = await TaskModel.findByIdAndDelete(id);
    res.redirect('/tasks'); 
})


app.listen(3000, () => {
    console.log('Listening to 3000');
})