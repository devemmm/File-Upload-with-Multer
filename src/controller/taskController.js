const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const Task = require('../models/Task')

exports.index = [
    (req, res) => {
        res.send({ status: 200, router_name: 'index', msg: 'success' })
    }
]

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|doc|docx|pdf)$/)) {
            return cb(new Error('please upload a word file'))
        }

        cb(undefined, true)
    }
})

exports.handleMulterError = [
    (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    }
]

exports.uploadMiddleware = [upload.single('upload')]


exports.createTask = [
    async(req, res) => {
        try {
            console.log(req.file)
            const task = new Task({
                email: 'djntivu',
                password: 'passwe',
                file: req.file.path
            })
            await task.save()

            res.status(201).send({
                status: 200,
                router_name: 'index',
                msg: 'success',
                data: {
                    email: task.email,
                    password: task.password
                }
            })
        } catch (err) {
            return res.status(400).send({ err })
        }

    }
]


exports.getTask = [
    async(req, res) => {
        try {
            const task = await Task.findById({ _id: '5f3275f2e8d63f26b1134d70' })
            if (!task) {
                return res.status(400).send({ msg: 'No Task Found !' })
            }
            const file_url = task.file.replace('files', 'http://localhost:3000')

            console.log(file_url)
            res.send({
                status: 200,
                router_name: 'index',
                msg: 'success',
                data: {
                    email: task.email,
                    password: task.password,
                    file_url
                }
            })
        } catch (error) {
            return res.status(400).send({ err })
        }
    }
]