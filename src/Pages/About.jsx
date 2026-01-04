import React from 'react';
import useTitle from '../Components/usetTitle';

const About = () => {
    useTitle("About Us");

    return (
       <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">About PayBill</h1>

      <p className="text-base-content/80 mb-4">
        PayBill is a modern utility bill management platform designed to help
        users easily view, manage, and pay their monthly utility bills including
        Electricity, Gas, Water, and Internet services.
      </p>

      <p className="text-base-content/80 mb-4">
        Our goal is to make bill payments simple, secure, and transparent.
        Users can track their payment history, download PDF reports, and ensure
        they only pay bills for the current month.
      </p>

      <p className="text-base-content/80">
        PayBill is built using the MERN stack with a focus on performance,
        security, and a clean user experience.
      </p>
    </div>
    );
};

export default About;