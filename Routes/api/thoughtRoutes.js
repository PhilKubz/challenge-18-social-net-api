const express = require('express');
const router = express.Router();

// Import the thought controller
const ThoughtController = require('../../controllers/thoughtController');

// TODO --- Define the thought routes
router.get('/', ThoughtController.getAllThoughts);
router.get('/:id', ThoughtController.getThoughtById);
router.post('/', ThoughtController.createThought);
router.put('/:id', ThoughtController.updateThought);
router.delete('/:id', ThoughtController.deleteThought);
router.post('/:thoughtId/reactions', ThoughtController.createReaction);
router.delete('/:thoughtId/reactions/:reactionId', ThoughtController.deleteReaction);

module.exports = router;
