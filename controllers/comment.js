const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// POST /comments - Create a new comment
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      user: req.session.user._id,
      team: req.body.teamId
    });
    res.redirect(`/team/${req.body.teamId}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// GET /comments/:id/edit - Show form to edit comment
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.render('comment/edit.ejs', { comment });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// PUT /comments/:id - Update a comment
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, { content: req.body.content });
    res.redirect(`/team/${req.body.teamId}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// DELETE /comments/:id - Delete a comment
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.redirect(`/team/${comment.team}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
