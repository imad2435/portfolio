import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

// Helper to format the timestamp for display
const formatTimestamp = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch all contact messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      // This is a protected route, but our 'api' utility handles the token
      const res = await api.get('/contact-messages');
      setMessages(res.data);
    } catch (err) {
      setError('Failed to fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages when the component first loads
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to handle deleting a message
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact-messages/${id}`);
        // After deleting, refresh the list of messages
        fetchMessages();
      } catch (err) {
        setError('Failed to delete message.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>
      
      {error && <p className="text-red-400 mb-4">{error}</p>}
      
      <div className="space-y-4">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="bg-gray-800 p-5 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {message.name} - <span className="text-sm font-normal text-indigo-400">{message.email}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Received: {formatTimestamp(message.createdAt)}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(message._id)}
                  className="text-red-400 hover:text-red-300 ml-4 font-semibold"
                >
                  Delete
                </button>
              </div>
              <p className="mt-3 text-gray-300 whitespace-pre-line">{message.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageMessages;