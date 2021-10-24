const mongoose= require('mongoose');

//creating the scheme
const categorySchema= new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
});

const category = mongoose.model('category',categorySchema);

module.exports = category;