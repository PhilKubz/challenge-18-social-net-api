const Thought = require('../Models/Thought');
const User = require('../Models/User');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by its _id
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;

    Thought.create({ thoughtText, username, userId })
      .then((thought) => {
        return User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought created' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by its _id
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought updated' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a thought by its _id
  removeThought(req, res) {
    Thought.findByIdAndRemove(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        return User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought removed' }))
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    const { reactionBody, username } = req.body;

    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Reaction created' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Reaction removed' });
      })
      .catch((err) => res.status(500).json(err));
  },
};
