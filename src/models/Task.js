const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task