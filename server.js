require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');  

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => { 
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
}); 

// Morgan for logging HTTP requests
app.use(morgan('dev'));
// Serves static assets to the browser
app.use(express.static('public'));
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true
}));

// Require the middleware that adds the user doc to the req & the res.locals objects
const addUserToReqAndLocals = require('./middleware/addUserToReqAndLocals');
// Be sure to mount after the session middleware above
app.use(addUserToReqAndLocals);

// Routes/Controllers
const ensureLoggedIn = require('./middleware/ensureLoggedIn');

// Mount routes
app.use('/auth', require('./controllers/auth'));
app.use('/team', require('./controllers/team'));
app.use('/comments', require('./controllers/comment'));

// GET / (root/landing page)
app.get('/', async (req, res) => {
  res.render('home.ejs');
});

// GET /teams/new (new function)
app.get("/team/new" , (req, res) => {
  res.send("This renders a form to select a team");
});

// Set the port from environment variable or default to 3000
const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
