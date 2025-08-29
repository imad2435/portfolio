const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // For images and files, we will store the URL path as a string.
  // The actual file will be uploaded to a service like Cloudinary or stored locally.
  image: {
    type: String,
    required: true,
  },
  // This is how we create a Many-to-Many relationship.
  // It's an array of ObjectIDs, and the `ref` tells Mongoose
  // that these IDs refer to documents in the 'Skill' collection.
  technologies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
  github_link: { type: String, trim: true },
  live_link: { type: String, trim: true },
  display_order: {
    type: Number,
    default: 0,
  },
}, {
  // This option automatically adds `createdAt` and `updatedAt` fields.
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;