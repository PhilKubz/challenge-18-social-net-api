const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  // User schema fields here
});

// the virtual friendCount field for the User schema
UserSchema.virtual('friendCount').get(function () {
  // logic to retrieve the length of the friends array field
});

// any additional methods or hooks for the User model here

const User = mongoose.model('User', UserSchema);

module.exports = User;
