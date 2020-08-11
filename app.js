require('./src/db/mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const appRoute = require('./src/routers/appRoute')
const app = express()

app.use(express.static('files'))
app.use(bodyParser.json())
app.use(appRoute)

app.listen(process.env.PORT, () => {
    console.log(`server is running at Port ${process.env.PORT}`)
})