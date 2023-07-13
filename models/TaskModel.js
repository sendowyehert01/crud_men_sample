const mongoose = require('mongoose');

const TaskModelSchema =  new mongoose.Schema({
    task: {
        type: String,
    }
});

const TaskModel = mongoose.model("TaskModel", TaskModelSchema);

module.exports = TaskModel;