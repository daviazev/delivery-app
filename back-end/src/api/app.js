const express = require('express');
const userRoutes = require('./routes/user.routes');

const errorHandler = require('./middlewares/ErrorHandler')

const app = express();

app.use(express.json());

app.use(userRoutes);


app.use(errorHandler)

module.exports = app;
