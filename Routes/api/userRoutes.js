const express = require('express');
const router = express.Router();

// Import the user controller
const UserController = require('../../controllers/userController');

// TODO --- Define the user routes
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/:userId/friends/:friendId', UserController.addFriend);
router.delete('/:userId/friends/:friendId', UserController.removeFriend);

module.exports = router;
