const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const dbRoutes = require('./routes/databaseRoutes.js');
const app = express();
const mongoose = require('mongoose');
const connect = process.env.MONGODB_URI;

mongoose.connect(connect);

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())

app.use('/db', dbRoutes);
app.get('/ping', function (req, res) {
  console.log("PINGS!");
 return res.send('pong');
});

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
