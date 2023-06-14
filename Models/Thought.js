const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reaction subdocument schema
const ReactionSchema = new Schema({
  // Reaction schema fields here
});

const ThoughtSchema = new Schema({
  // Thought schema fields here
});

// virtual reactionCount field for the Thought schema
ThoughtSchema.virtual('reactionCount').get(function () {
  // logic to retrieve the length of the reactions array field
});

// any additional methods or hooks for the Thought model here

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
