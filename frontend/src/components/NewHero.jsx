import React from 'react';

const NewHero = () => {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-brand-light p-4"
    >
      {/* Background Image with Blur and Dark Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('/code_bg.jpg')" }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl md:text-6xl font-bold tracking-widest mb-6">
          <span className="inline-block border-2 border-white rounded-full p-2">
            <span className="inline-block border-2 border-white rounded-full p-2">C</span>
          </span>ODING
        </div>
        <h1 className="text-4xl md:text-7xl font-bold mb-4">Redefining Digital with AI</h1>
        <a href="https://xcoding.ai" target="_blank" rel="noopener noreferrer" className="text-xl text-brand-gray hover:text-brand-light transition-colors">
          xcoding.ai
        </a>
      </div>
    </section>
  );
};

export default NewHero;