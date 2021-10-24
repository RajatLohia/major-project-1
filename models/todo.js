const mongoose= require('mongoose');

//creating the scheme
const todoSchema= new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
});

const todo = mongoose.model('todo',todoSchema);

module.exports = todo;