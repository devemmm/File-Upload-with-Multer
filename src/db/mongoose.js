const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database')
}).catch(() => {
    console.log('unable to connect to database')
})