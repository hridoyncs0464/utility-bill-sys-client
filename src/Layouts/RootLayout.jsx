import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
// import WhyChooseUs from '../Components/WhyChooseUs';
// import HowItWorks from '../Components/HowItWorks';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
             <Navbar></Navbar>
             <Outlet></Outlet>
             {/* <WhyChooseUs></WhyChooseUs>
             <HowItWorks></HowItWorks> */}
             <Footer></Footer> 
        </div>
    );
};

export default RootLayout;