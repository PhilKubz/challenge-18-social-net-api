const User = require('./models/User');
const Thought = require('./models/Thought');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by its _id and populated thought and friend data
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    const { username, email } = req.body;

    User.create({ username, email })
      .then((user) => res.json({ message: 'User created' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by its _id
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a user by its _id
  removeUser(req, res) {
    User.findByIdAndRemove(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Remove the user's associated thoughts
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User and associated thoughts removed' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add a new friend to a user's friend list
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Friend added' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Friend removed' });
      })
      .catch((err) => res.status(500).json(err));
  },
};
