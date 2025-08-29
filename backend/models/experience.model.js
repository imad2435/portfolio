const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  // The 'enum' property ensures that the 'category' field can ONLY be one of these two values.
  category: {
    type: String,
    required: true,
    enum: ['work', 'education'],
    default: 'work',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  // Mongoose uses the native JavaScript Date type.
  start_date: {
    type: Date,
    required: true,
  },
  // end_date is optional, so no 'required: true'.
  end_date: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;