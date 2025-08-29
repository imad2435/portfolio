import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  // All the state and data fetching has been moved to the Navbar.
  // This component is now simple again.
  return (
    <div className="bg-apex-dark text-apex-white font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;