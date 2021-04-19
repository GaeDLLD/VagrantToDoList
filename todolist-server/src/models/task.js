var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {type: String, lowercase: true, required: [true, "can't be blank"] },
    description: string
}, {timestamps: true});

mongoose.model('Todolist', TaskSchema);