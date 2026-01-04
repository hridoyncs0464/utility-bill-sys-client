import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
// import WhyChooseUs from '../Components/WhyChooseUs';
// import HowItWorks from '../Components/HowItWorks';

const RootLayout = () => {
    return (
      
      <>
      <Navbar />

      {/* Page Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* Full-width Footer */}
      <Footer />
    </>
    );
};

export default RootLayout;