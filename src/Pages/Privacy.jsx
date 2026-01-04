import React from 'react';
import useTitle from '../Components/usetTitle';

const Privacy = () => {
    useTitle("Privacy Policy");

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="text-base-content/80 mb-4">
        PayBill respects your privacy and is committed to protecting your
        personal information. We collect only the data necessary to provide
        our services effectively.
      </p>

      <p className="text-base-content/80 mb-4">
        Your login credentials and payment-related information are securely
        handled using industry-standard security practices.
      </p>

      <p className="text-base-content/80">
        We do not share your personal data with third parties without your
        consent unless required by law.
      </p>
    </div>
    );
};

export default Privacy;