const mongoose = require('mongoose');

// A Schema defines the structure of a document in a MongoDB collection.
const skillSchema = new mongoose.Schema({
  // 'name' is a required (required: true) string (type: String)
  // that must be unique within the collection (unique: true).
  // trim: true automatically removes any leading/trailing whitespace.
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

// A Model is a constructor compiled from a Schema definition.
// An instance of a model is a document.
// Mongoose will create a collection named 'skills' (plural, lowercase) for this model.
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;