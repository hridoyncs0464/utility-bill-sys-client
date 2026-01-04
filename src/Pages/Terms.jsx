import React from 'react';
import useTitle from '../Components/usetTitle';

const Terms = () => {
    useTitle("Terms & Conditions");

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="text-base-content/80 mb-4">
        By using PayBill, you agree to comply with the terms and conditions
        outlined below. These terms are designed to ensure a safe and reliable
        experience for all users.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        User Responsibilities
      </h2>
      <p className="text-base-content/80 mb-4">
        Users are responsible for providing accurate information while paying
        utility bills and maintaining the confidentiality of their account
        credentials.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Payments & Transactions
      </h2>
      <p className="text-base-content/80 mb-4">
        PayBill allows payments only for current month bills. Any incorrect or
        failed transactions are subject to verification and system logs.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Service Availability
      </h2>
      <p className="text-base-content/80">
        We strive to keep the platform available at all times, but temporary
        interruptions may occur due to maintenance or technical issues.
      </p>
    </div>
    );
};

export default Terms;