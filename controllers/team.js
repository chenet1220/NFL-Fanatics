const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET /teams - List all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.render('teams/index.ejs', { teams });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// GET /teams/new - Show form to create new team
router.get('/new', ensureLoggedIn, (req, res) => {
    res.render('teams/new.ejs');
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

// GET /teams/:id/edit - Show form to edit team
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        res.render('teams/edit.ejs', { team });
    } catch (err) {
        console.error(err);
        res.redirect('/teams');
    }
});

// PUT /teams/:id - Update a team
router.put('/:id', ensureLoggedIn, async (req, res) => {
    try {
        await Team.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/teams');
    } catch (err) {
        console.error(err);
        res.redirect(`/teams/${req.params.id}/edit`);
    }
});

// DELETE /teams/:id - Delete a team
router.delete('/:id', ensureLoggedIn, async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.redirect('/teams');
    } catch (err) {
        console.error(err);
        res.redirect('/teams');
    }
});

module.exports = router;

