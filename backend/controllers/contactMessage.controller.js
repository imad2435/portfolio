const ContactMessage = require('../models/contactMessage.model');

// --- Public: CREATE a new contact message ---
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newMessage = await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: "Thank you for your message! I'll get back to you soon." });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// --- Admin: GET ALL contact messages ---
exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

// --- Admin: DELETE a contact message ---
exports.deleteContactMessage = async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};