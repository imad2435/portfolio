import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-apex-card text-apex-gray py-8 mt-16 border-t border-white/10">
      <div className="container mx-auto text-center">
        <p>© {currentYear} Imad Ali. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;