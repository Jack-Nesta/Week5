//This appears to be the main app
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const connectionString = process.env.MONGO_URL;
const PORT = process.env.PORT;
//console.log(connectionString)

mongoose.connect(connectionString);
const database = mongoose.connection;
//event listeners

database.on('error', () => {
  console.log('error');
});

database.once('connected', () => {
  console.log('Database is connected');
}) 

const app = express();
app.use(express.json());// change from plain text to json



app.get('/', function (req, res) {
  res.send('Hello, World!');
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port',PORT);

});
