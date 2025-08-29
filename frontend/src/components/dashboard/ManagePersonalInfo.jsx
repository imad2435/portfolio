import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ManagePersonalInfo = () => {
  const [info, setInfo] = useState({ name: '', title: '', bio: '', email: '', github_url: '', linkedin_url: '', profile_image: '', cv: '' });
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await api.get('/personal-info');
        setInfo(res.data);
      } catch (err) {
        console.log("No personal info found, creating a fresh slate.");
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);
  
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'profile_image_file') {
      setProfileImageFile(e.target.files[0]);
    } else if (e.target.name === 'cv_file') {
      setCvFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Saving...');
    
    try {
      let updatedInfo = { ...info };

      if (profileImageFile) {
        console.log('Step 1: Uploading profile image...');
        const formData = new FormData();
        formData.append('file', profileImageFile);
        const res = await api.post('/upload', formData);
        updatedInfo.profile_image = res.data.url;
        console.log('Step 2: Profile image uploaded. URL:', res.data.url);
      }
      
      if (cvFile) {
        console.log('Step 3: Uploading CV...');
        const formData = new FormData();
        formData.append('file', cvFile);
        const res = await api.post('/upload', formData);
        updatedInfo.cv = res.data.url;
        console.log('Step 4: CV uploaded. URL:', res.data.url);
      }

      console.log('Step 5: Saving all personal info to the database...');
      const finalResponse = await api.post('/personal-info', updatedInfo);
      setInfo(finalResponse.data);
      setProfileImageFile(null);
      setCvFile(null);
      document.querySelector('input[type="file"]').value = ''; // Reset file inputs
      setStatusMessage('Personal Info Saved Successfully!');
      console.log('Step 6: Success! Final data saved:', finalResponse.data);

    } catch (err) {
      console.error('--- ERROR DURING SAVE PROCESS ---', err);
      if (err.response) {
        console.error('Backend Error Response:', err.response.data);
      }
      setStatusMessage('Failed to save personal info. Check the console for details.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Personal Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
        <input name="name" value={info.name || ''} onChange={handleChange} placeholder="Name" required className="w-full bg-gray-700 p-2 rounded"/>
        <input name="title" value={info.title || ''} onChange={handleChange} placeholder="Title" required className="w-full bg-gray-700 p-2 rounded"/>
        <textarea name="bio" value={info.bio || ''} onChange={handleChange} placeholder="Bio" className="w-full bg-gray-700 p-2 rounded h-32"/>
        <input name="email" value={info.email || ''} onChange={handleChange} placeholder="Email" type="email" className="w-full bg-gray-700 p-2 rounded"/>
        <input name="github_url" value={info.github_url || ''} onChange={handleChange} placeholder="GitHub URL" type="url" className="w-full bg-gray-700 p-2 rounded"/>
        <input name="linkedin_url" value={info.linkedin_url || ''} onChange={handleChange} placeholder="LinkedIn URL" type="url" className="w-full bg-gray-700 p-2 rounded"/>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Profile Image</label>
          <input name="profile_image_file" type="file" onChange={handleFileChange} className="w-full bg-gray-700 text-white rounded p-2"/>
          {info.profile_image && <p className="text-xs text-gray-400 mt-1">Current: <a href={info.profile_image} target="_blank" rel="noopener noreferrer" className="text-indigo-400">View Image</a></p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">CV / Resume</label>
          <input name="cv_file" type="file" onChange={handleFileChange} className="w-full bg-gray-700 text-white rounded p-2"/>
          {info.cv && <p className="text-xs text-gray-400 mt-1">Current: <a href={info.cv} target="_blank" rel="noopener noreferrer" className="text-indigo-400">View CV</a></p>}
        </div>
        
        <button type="submit" disabled={statusMessage === 'Saving...'} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500">
          {statusMessage === 'Saving...' ? 'Saving...' : 'Save Info'}
        </button>
        {statusMessage && <p className="mt-4">{statusMessage}</p>}
      </form>
    </div>
  );
};

export default ManagePersonalInfo;