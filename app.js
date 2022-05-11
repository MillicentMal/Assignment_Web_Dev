const { application } = require('express');
const express = require('express');
const res = require('express/lib/response');
const app = express();
const mongoose  = require('mongoose');
const { translateAliases } = require('./models/task');
const router = require('./routes/tasks');
require('dotenv/config');

// importing routes
const TaskRoute = require('./routes/tasks.js');


// Middleware 
app.use(express.json());
app.use('/v1/tasks', TaskRoute);
app.use('/', TaskRoute);
app.use('/v1/tasks/:id', TaskRoute)


// connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }); 
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));



app.get('/', (req, res) => {
    res.send("TO DO API");
});



app.listen(3000);