const express = require('express');
const router = express.Router(); // Ensure router is properly defined
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ensureLoggedIn = require('../middleware/ensureLoggedIn'); // Include middleware if needed

// All paths start with "/auth"

// GET /auth/sign-up (show sign-up form)
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// POST /auth/sign-up (create user)
router.post('/sign-up', async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error('Password & confirmation do not match');
    }
    req.body.password = bcrypt.hashSync(req.body.password, 6);
    const user = await User.create(req.body);
    req.session.user = { _id: user._id, username: user.username }; // Store username in session
    req.session.save();
    res.redirect('/team'); // Redirect to teams page after sign-up
  } catch (err) {
    console.log(err);
    res.redirect('/auth/sign-up');
  }
});

// POST /auth/login (login user)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.redirect('/auth/login');
    }
    req.session.user = { _id: user._id, username: user.username };
    req.session.save();
    res.redirect('/teams'); // Redirect to teams page after login
  } catch (err) {
    console.log(err);
    res.redirect('/auth/login');
  }
});

// GET /auth/login (show login form)
router.get('/login', (req, res) => {
  res.render('auth/login.ejs');
});

// GET /auth/logout (logout)
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

