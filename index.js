const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//Database connection
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((error) => {
        console.log("Unable to connect  to the database");
        console.log(error);
            })

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Middlewares
app.use(express.json());

//Router middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute); 

app.listen(3000, () => {
    console.log('Server is up and running');
})