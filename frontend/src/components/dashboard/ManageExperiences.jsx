import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

// Helper to format date for input fields (YYYY-MM-DD)
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toISOString().split('T')[0];
};

const ManageExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for the "add new" form
  const [formData, setFormData] = useState({
    category: 'work',
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  // Function to fetch all experiences
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await api.get('/experiences');
      setExperiences(res.data);
    } catch (err) {
      setError('Failed to fetch experiences.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new experience
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/experiences', formData);
      // Reset form to default values
      setFormData({ category: 'work', title: '', company: '', start_date: '', end_date: '', description: '' });
      fetchExperiences(); // Refresh the list
    } catch (err) {
      setError('Failed to create experience.');
    }
  };

  // Handle deleting an experience
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.delete(`/experiences/${id}`);
        fetchExperiences(); // Refresh the list
      } catch (err) {
        setError('Failed to delete experience.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Experiences</h2>
      
      {/* ADD EXPERIENCE FORM */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Experience</h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-700 p-2 rounded">
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
            </select>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title (e.g., Software Engineer)" required className="w-full bg-gray-700 p-2 rounded"/>
            <input name="company" value={formData.company} onChange={handleChange} placeholder="Company / University" required className="w-full bg-gray-700 p-2 rounded"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Start Date</label>
              <input name="start_date" type="date" value={formData.start_date} onChange={handleChange} required className="w-full bg-gray-700 p-2 rounded"/>
            </div>
            <div>
              <label className="text-sm text-gray-400">End Date (leave blank if current)</label>
              <input name="end_date" type="date" value={formData.end_date} onChange={handleChange} className="w-full bg-gray-700 p-2 rounded"/>
            </div>
          </div>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full bg-gray-700 p-2 rounded h-28"/>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add Experience
          </button>
        </form>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* EXPERIENCES TABLE */}
      <div className="bg-gray-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp._id} className="border-b border-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{exp.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{exp.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 capitalize">{exp.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(exp._id)} className="text-red-400 hover:text-red-300 ml-4">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageExperiences;