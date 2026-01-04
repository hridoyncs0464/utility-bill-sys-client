import React from 'react';
import useTitle from '../Components/usetTitle';

const Help = () => {
    useTitle("Help & FAQ");

    return (
         <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>

      <div className="space-y-6 max-w-3xl">
        <div>
          <h3 className="text-lg font-semibold">
            How can I pay my utility bill?
          </h3>
          <p className="text-base-content/80">
            Go to the Bills page, select a bill from the current month, and click
            the “Pay Bill” button. Fill in the required information and submit.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Why is the Pay Bill button disabled?
          </h3>
          <p className="text-base-content/80">
            Bills can only be paid for the current month. If the bill date is not
            from the current month, the payment option will remain disabled.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Can I download my payment history?
          </h3>
          <p className="text-base-content/80">
            Yes. From the My Pay Bills page, you can download a PDF report of all
            your paid bills.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Is my personal data secure?
          </h3>
          <p className="text-base-content/80">
            Absolutely. PayBill uses secure authentication and does not share
            user data with third parties.
          </p>
        </div>
      </div>
    </div>
    );
};

export default Help;