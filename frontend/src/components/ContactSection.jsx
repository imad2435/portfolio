import React, { useState } from 'react';
import axios from 'axios';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await axios.post('/api/contact-messages', formData);
      setStatus(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 text-brand-light scroll-mt-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4">Contact</h2>
        <p className="text-brand-gray mb-12">Have a question or want to work together?</p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left space-y-4">
          <input 
            name="name" 
            type="text" 
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            required 
            className="w-full bg-transparent border border-brand-border p-3 focus:outline-none focus:border-brand-accent"
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Your Email *" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="w-full bg-transparent border border-brand-border p-3 focus:outline-none focus:border-brand-accent"
          />
          <textarea 
            name="message" 
            placeholder="Message" 
            value={formData.message}
            onChange={handleChange}
            required 
            className="w-full bg-transparent border border-brand-border p-3 h-40 focus:outline-none focus:border-brand-accent"
          ></textarea>
          <div className="text-right">
            <button type="submit" className="bg-brand-accent text-brand-light font-bold py-3 px-8 rounded-lg hover:opacity-80 transition-opacity">
              Send
            </button>
          </div>
        </form>
        {status && <p className="text-center mt-4">{status}</p>}
      </div>
    </section>
  );
};

export default ContactSection;