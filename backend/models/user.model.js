const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // We'll use email as the unique identifier for login.
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  // We won't store the password directly, only a hashed version.
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false, // This ensures the password is not sent back in queries by default
  },
  // This replaces Django's 'is_superuser' or 'is_staff'
  role: {
    type: String,
    enum: ['admin'], // We only have one role for this project
    default: 'admin',
  },
});

// --- Mongoose Middleware (pre-save hook) ---
// This function runs automatically BEFORE a user document is saved to the database.
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;