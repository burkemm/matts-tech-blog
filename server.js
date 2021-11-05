const path = require('path');
const express = require('express');
const session = require('express-session');
const exphandlebars = require('express-handlebars');
const routes = require('./controllers/');
const helpers = require('./utils/helpers');
require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeSave = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// These custom helpers create handlebar.js
const handlebars = exphandlebars.create({ helpers });
// This is for the active session. Encrypts the password.
const activeSession = {
  secret: process.env.SV_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeSave({
    db: sequelize
  })
};

app.use(session(activeSession));

// this tells exporess.js what template to use.
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});