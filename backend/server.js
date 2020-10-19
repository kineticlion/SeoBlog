const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const cors = require('cors');  // use when needed
require('dotenv').config()
//bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth')
//app
const app = express();

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', blogRoutes)
app.use('/api', authRoutes)

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB CONNECTED'))
    .catch(e => console.log('Error', e))

//cors
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({
//         origin: process.env.CLIENT_URL
//     }));
// }

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})