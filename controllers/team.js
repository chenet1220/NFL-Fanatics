const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// Existing routes...

// POST /teams/:id/comments - Add a comment to a team
router.post('/:id/comments', ensureLoggedIn, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    team.comments.push({
      text: req.body.text,
      author: req.session.user._id
    });
    await team.save();
    res.redirect(`/teams/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/teams/${req.params.id}`);
  }
});

// GET /teams/:id - Show team details including comments
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('comments.author');
    res.render('teams/show.ejs', { team });
  } catch (err) {
    console.error(err);
    res.redirect('/teams');
  }
});



module.exports = router;

