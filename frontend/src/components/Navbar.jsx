import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom'; 
import { Link as ScrollLink } from 'react-scroll';
import { Command } from 'cmdk'; // Note: We import Command, not Command.Dialog
import axios from 'axios';

const Navbar = () => {
  const scrollOffset = -80; 
  // State to control the visibility of the search dropdown
  const [open, setOpen] = useState(false);
  // State to hold data for the search actions (CV, GitHub links)
  const [info, setInfo] = useState(null);
  const commandRef = useRef(null);

  // Fetch personal info for the action links
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get('/api/personal-info');
        setInfo(res.data);
      } catch (err) { console.error("Could not fetch info for command palette."); }
    };
    fetchInfo();
  }, []);
  
  // This effect closes the dropdown if you click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commandRef.current && !commandRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [commandRef]);

  const runAction = (action) => {
    action();
    setOpen(false); // Close dropdown after action
  };

  return (
    <nav className="bg-apex-dark/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <RouterLink to="/" className="text-xl font-bold text-white">Imad Ali</RouterLink>
          
          {/* --- THE NEW INTEGRATED SEARCH --- */}
          {/* This relative container is crucial for positioning the dropdown */}
          <div ref={commandRef} className="relative flex-1 flex justify-center px-8">
            <Command className="w-full">
              <Command.Input 
                onFocus={() => setOpen(true)} // Open dropdown on focus
                placeholder="Search or type a command..."
                className="w-full max-w-sm py-2 px-4 bg-apex-card border border-white/10 rounded-lg text-apex-white placeholder-apex-gray focus:outline-none focus:ring-2 focus:ring-apex-purple"
              />
              {open && (
                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>
                  <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => runAction(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }))}>Home</Command.Item>
                    <Command.Item onSelect={() => runAction(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}>Projects</Command.Item>
                    <Command.Item onSelect={() => runAction(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }))}>Skills</Command.Item>
                  </Command.Group>
                  {info && (
                    <Command.Group heading="Actions">
                      {info.cv && <Command.Item onSelect={() => runAction(() => window.open(info.cv, '_blank'))}>Download CV</Command.Item>}
                      {info.github_url && <Command.Item onSelect={() => runAction(() => window.open(info.github_url, '_blank'))}>Open GitHub</Command.Item>}
                    </Command.Group>
                  )}
                </Command.List>
              )}
            </Command>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <ScrollLink to="home" spy={true} smooth={true} duration={500} offset={scrollOffset} className="text-apex-gray hover:text-apex-purple transition duration-300 cursor-pointer">Home</ScrollLink>
              <ScrollLink to="projects" spy={true} smooth={true} duration={500} offset={scrollOffset} className="text-apex-gray hover:text-apex-purple transition duration-300 cursor-pointer">Projects</ScrollLink>
              <ScrollLink to="skills" spy={true} smooth={true} duration={500} offset={scrollOffset} className="text-apex-gray hover:text-apex-purple transition duration-300 cursor-pointer">Skills</ScrollLink>
            </div>
            <RouterLink to="/login" className="bg-apex-card text-white font-semibold py-2 px-5 rounded-full text-sm hover:bg-white/20 border border-white/10 transition duration-300">
              Admin Login
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;