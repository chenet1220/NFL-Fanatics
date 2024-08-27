const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET /teams - List all teams with comments
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({}).populate('comments');
    res.render('teams/index.ejs', { teams });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// GET /teams/new - Show form to create new team
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('team/new.ejs');
});

// POST /teams - Create a new team
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.redirect('/teams');
  } catch (err) {
    console.error(err);
    res.redirect('/teams/new');
  }
});

// GET /teams/:id - Show a single team with comments
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate({
      path: 'comments',
      populate: { path: 'user' }
    });
    res.render('teams/show.ejs', { team });
  } catch (err) {
    console.error(err);
    res.redirect('/teams');
  }
});

module.exports = router;

