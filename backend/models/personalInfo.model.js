const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
  },
  // Just like in the Project model, we store the URL path to the uploaded files.
  profile_image: {
    type: String,

  },
  cv: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  github_url: {
    type: String,
    trim: true,
  },
  linkedin_url: {
    type: String,
    trim: true,
  },
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = PersonalInfo;