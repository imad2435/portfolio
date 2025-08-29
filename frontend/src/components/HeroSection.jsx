import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ info }) => {
  // If there's no info, we don't render anything to avoid errors
  if (!info) { 
    return (
      <header id="home" className="min-h-screen flex items-center justify-center">
        Loading personal information...
      </header>
    );
  }

  return (
    <header id="home" className="min-h-screen flex items-center justify-center text-brand-light p-8 scroll-mt-20">
      <div className="container mx-auto">
        {/* Two-column layout for medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Profile Image (animates in from the left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            {info.profile_image && (
              <img 
                src={info.profile_image} 
                alt={info.name} 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-brand-border shadow-2xl"
              />
            )}
          </motion.div>

          {/* Right Column: Text Content (animates in from the right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-2">{info.name}</h1>
            <p className="text-2xl md:text-3xl text-brand-gray font-semibold mb-6">{info.title}</p>
            <p className="text-lg text-brand-light/90 mb-8 whitespace-pre-line max-w-lg mx-auto md:mx-0">{info.bio}</p>
            
            {/* The Buttons are back */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
              {info.cv && (
                <a 
                  href={info.cv} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent text-white font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition duration-300"
                >
                  Download CV
                </a>
              )}
              {info.github_url && (
                <a 
                  href={info.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-brand-border text-brand-light font-semibold py-3 px-8 rounded-lg hover:bg-brand-border transform hover:scale-105 transition duration-300"
                >
                  GitHub
                </a>
              )}
              {info.linkedin_url && (
                <a 
                  href={info.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-brand-border text-brand-light font-semibold py-3 px-8 rounded-lg hover:bg-brand-border transform hover:scale-105 transition duration-300"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </header>
  );
};

export default HeroSection;