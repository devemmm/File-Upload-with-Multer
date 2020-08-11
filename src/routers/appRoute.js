const express = require('express')
const taskController = require('../controller/taskController')
const router = express.Router()

router.get('/', taskController.index)

router.post('/tasks', taskController.uploadMiddleware, taskController.createTask, taskController.handleMulterError)

router.get('/tasks', taskController.getTask)


module.exports = router