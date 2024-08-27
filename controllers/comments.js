const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// POST /teams/:teamId/comments - Create a new comment
router.post('/teams/:teamId/comments', ensureLoggedIn, async (req, res) => {
  try {
    req.body.team = req.params.teamId;
    req.body.author = req.user._id;
    const team = await Team.findById(req.params.teamId);
    team.comments.push(req.body);
    await team.save();
    res.redirect(`/teams/${req.params.teamId}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// GET /comments/:id/edit - Show form to edit comment
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
  try {
    //const comment = await Comment.findById(req.params.id);
    res.render('comment/edit.ejs', { comment });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// PUT /comments/:id - Update a comment
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    //await Comment.findByIdAndUpdate(req.params.id, { content: req.body.content });
    res.redirect(`/team/${req.body.teamId}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// DELETE /comments/:id - Delete a comment
router.delete('/comments/:id', ensureLoggedIn, async (req, res) => {
  try {
    const team = await Team.findOne({'comments._id': req.params.id});
    team.comments.pull(req.params.id);
    await team.save();
    res.redirect(`/teams/${team._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
