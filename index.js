'use strict';

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment-timezone');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

var routes = require('./routes/index');
app.use('/', routes);

// /hello 'Hi to DESKTOP User' ✅
app.get('/hello', function (req, res) {
  res.send('Hi to ' + req.device.type.toUpperCase() + ' User');
});

// √
const dotenv = require('dotenv');
dotenv.config({ path: '.env' }); // ./config/config.env

const PORT = process.env.PORT || 5000;

app.use(
  require('express-basic-auth')({
    users: { admin: 'password' }, // vergib hier deine gewünschten Benutzernamen und Passwörter
    challenge: true,
  })
);

// listen for requests :)
var server = app.listen(PORT, function () {
  console.log(
    `Server is runnig on ${process.env.NODE_ENV} mode at port ${PORT}`
  );
});
