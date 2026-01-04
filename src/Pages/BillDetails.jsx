import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";
import useTitle from "../Components/usetTitle";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Category images
const categoryImages = {
  Electricity:
    "https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=600",
  Gas: "https://media.istockphoto.com/id/1344216982/photo/home-heating-gas-expenses-and-bill-statement-document.webp",
  Water:
    "https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=600",
  Internet:
    "https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=600",
};

// Category tips
const tips = {
  Electricity: [
    "Use LED bulbs",
    "Turn off appliances when not used",
    "Check monthly meter reading",
  ],
  Gas: [
    "Ensure gas leak safety",
    "Regular maintenance saves cost",
    "Check gas usage trends",
  ],
  Water: ["Avoid wastage", "Fix dripping taps", "Track monthly consumption"],
  Internet: [
    "Check data usage",
    "Upgrade plan if needed",
    "Secure Wi-Fi network",
  ],
};

const BillDetails = () => {
  const bill = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [relatedBills, setRelatedBills] = useState([]);

  useTitle(`${bill.title} - Bill Details`);

  const { _id, title, category, location, description, amount, date } = bill;
  const billMonth = new Date(date).getMonth();
  const currentMonth = new Date().getMonth();
  const isCurrentMonth = billMonth === currentMonth;

  // Fetch payment history & related bills
  useEffect(() => {
    fetch(`https://utility-bill-sys-server.vercel.app/payments?billId=${_id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data || []))
      .catch(() => setHistory([]));

    fetch(
      `https://utility-bill-sys-server.vercel.app/all-bills?category=${category}`
    )
      .then((res) => res.json())
      .then((data) => setRelatedBills(data.filter((b) => b._id !== _id)))
      .catch(() => setRelatedBills([]));
  }, [_id, category]);

  // Handle pay bill
  const handlePayBill = (e) => {
    e.preventDefault();
    const form = e.target;
    const payData = {
      billId: _id,
      email: bill.email,
      username: form.username.value,
      address: form.address.value,
      phone: form.phone.value,
      amount,
      date: new Date().toISOString().split("T")[0],
      additionalInfo: form.additionalInfo.value,
    };

    fetch(`https://utility-bill-sys-server.vercel.app/pay-bills`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          Swal.fire("Warning!", data.message, "warning");
          return;
        }
        setIsOpen(false);
        Swal.fire("Success!", "Bill paid successfully", "success");
      })
      .catch(() => Swal.fire("Error!", "Something went wrong", "error"));
  };

  // Chart data
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Usage",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 200) + 50),
        borderColor: "#3b82f6",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Amount Paid",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 150) + 30),
        borderColor: "#f97316",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
      {/* Breadcrumb */}
      <div className="text-sm text-base-content/60 mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link to="/bills" className="hover:underline ml-1">
          Bills
        </Link>{" "}
        &gt; <span className="ml-1 font-semibold">{title}</span>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden shadow-lg">
        <img
          src={categoryImages[category] || categoryImages["Electricity"]}
          alt={category}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
          <h1 className="text-white text-4xl font-bold">{title}</h1>
          <div className="flex justify-between items-center">
            <span className="badge badge-primary">{category}</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-lg font-semibold">
              ৳{amount}
            </span>
          </div>
        </div>
      </div>

      {/* Key Info */}
      <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-semibold">Bill Information</h2>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Amount:</strong> ৳{amount}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
      </div>

      {/* Description & Tips */}
      <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-semibold">Description & Tips</h2>
        <p>{description}</p>
        <ul className="list-disc list-inside text-base-content/80 mt-2">
          {tips[category].map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Monthly Usage Chart */}
      <div className="bg-base-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Monthly Usage / Amount</h2>
        <Line data={chartData} />
      </div>

      {/* Payment History */}
      <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-semibold">Payment History</h2>
        <div className="flex justify-between mb-3 text-base-content/80">
          <span>Total Payments: {history.length}</span>
          <span>
            Total Paid: ৳
            {history.reduce((sum, h) => sum + h.amount, 0)}
          </span>
          <span>
            Last Paid: {history.length ? history[history.length - 1].date : "N/A"}
          </span>
        </div>
        {history.length === 0 ? (
          <p className="text-base-content/70">No payments yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id}>
                    <td>{item.date}</td>
                    <td>৳{item.amount}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Related Bills */}
      {relatedBills.length > 0 && (
        <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Related Bills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedBills.map((rb) => (
              <Link
                key={rb._id}
                to={`/bills/${rb._id}`}
                className="bg-base-200 shadow rounded-lg p-4 hover:shadow-lg transition relative"
              >
                <img
                  src={categoryImages[rb.category] || categoryImages["Electricity"]}
                  alt={rb.category}
                  className="h-32 w-full object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold">{rb.title}</h3>
                <p className="text-sm text-base-content/70">৳{rb.amount}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Pay Bill Button */}
      <div className="text-center">
        <button
          disabled={!isCurrentMonth}
          onClick={() => setIsOpen(true)}
          className={`btn btn-primary ${!isCurrentMonth ? "btn-disabled" : ""}`}
        >
          Pay Bill
        </button>
        {!isCurrentMonth && (
          <p className="text-red-500 mt-2 text-sm">
            Only current month bills can be paid.
          </p>
        )}
      </div>

      {/* Pay Bill Modal */}
      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Pay Bill</h3>
            <form onSubmit={handlePayBill} className="space-y-3">
              <input type="email" defaultValue={user.email} readOnly className="input input-bordered w-full" />
              <input type="text" value={_id} readOnly className="input input-bordered w-full" />
              <input type="number" value={amount} readOnly className="input input-bordered w-full" />
              <input name="username" placeholder="Your Name" required className="input input-bordered w-full" />
              <input name="address" placeholder="Address" required className="input input-bordered w-full" />
              <input name="phone" placeholder="Phone" required className="input input-bordered w-full" />
              <input type="date" value={new Date().toISOString().split("T")[0]} readOnly className="input input-bordered w-full" />
              <textarea name="additionalInfo" placeholder="Additional Info (optional)" className="textarea textarea-bordered w-full" />
              <div className="modal-action">
                <button className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setIsOpen(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default BillDetails;
















// import React, { use, useContext, useState, useEffect } from "react";
// import { useLoaderData, Link } from "react-router";
// import { AuthContext } from "../AuthContext/AuthContext";
// import Swal from "sweetalert2";
// import useTitle from "../Components/usetTitle";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const categoryImages = {
//   Electricity: "https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=600",
//   Gas: "https://media.istockphoto.com/id/1344216982/photo/home-heating-gas-expenses-and-bill-statement-document.webp",
//   Water: "https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=600",
//   Internet: "https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=600",
// };

// const BillDetails = () => {
//   const bill = useLoaderData();
//   const { user } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [relatedBills, setRelatedBills] = useState([]);

//   useTitle(`${bill.title} - Bill Details`);

//   const {
//     _id,
//     title,
//     category,
//     location,
//     description,
//     amount,
//     date,
//     email,
//   } = bill;

//   const billMonth = new Date(date).getMonth();
//   const currentMonth = new Date().getMonth();
//   const isCurrentMonth = billMonth === currentMonth;

//   // Fetch bill history (simulated)
//   useEffect(() => {
//     fetch(`https://utility-bill-sys-server.vercel.app/payments?billId=${_id}`)
//       .then(res => res.json())
//       .then(data => setHistory(data || []))
//       .catch(() => setHistory([]));
    
//     // Fetch related bills
//     fetch(`https://utility-bill-sys-server.vercel.app/all-bills?category=${category}`)
//       .then(res => res.json())
//       .then(data => setRelatedBills(data.filter(b => b._id !== _id)))
//       .catch(() => setRelatedBills([]));
//   }, [_id, category]);

//   const handlePayBill = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const payData = {
//       billId: _id,
//       email: bill.email,
//       username: form.username.value,
//       address: form.address.value,
//       phone: form.phone.value,
//       amount,
//       date: new Date().toISOString().split("T")[0],
//       additionalInfo: form.additionalInfo.value,
//     };

//     fetch(`https://utility-bill-sys-server.vercel.app/pay-bills`, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(payData),
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (!data.success) {
//           Swal.fire("Warning!", data.message, "warning");
//           return;
//         }
//         setIsOpen(false);
//         Swal.fire("Success!", "Bill paid successfully", "success");
//       })
//       .catch(() => {
//         Swal.fire("Error!", "Something went wrong", "error");
//       });
//   };

//   // Simulated monthly usage for chart
//   const chartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     datasets: [
//       {
//         label: `${category} Usage/Amount`,
//         data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 200) + 50),
//         fill: false,
//         borderColor: "#3b82f6",
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
//       {/* Hero Section */}
//       <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
//         <img
//           src={categoryImages[category] || categoryImages["Electricity"]}
//           alt={category}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <h1 className="text-white text-4xl font-bold">{title}</h1>
//         </div>
//       </div>

//       {/* Key Info */}
//       <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
//         <h2 className="text-2xl font-semibold">Bill Information</h2>
//         <p><strong>Category:</strong> {category}</p>
//         <p><strong>Location:</strong> {location}</p>
//         <p><strong>Amount:</strong> ৳{amount}</p>
//         <p><strong>Date:</strong> {date}</p>
//       </div>

//       {/* Description & Tips */}
//       <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
//         <h2 className="text-2xl font-semibold">Description & Tips</h2>
//         <p>{description}</p>
//         <ul className="list-disc list-inside text-base-content/80 mt-2">
//           <li>Ensure timely payment to avoid late fees.</li>
//           <li>Track your usage to optimize costs.</li>
//           <li>Download your payment report for records.</li>
//         </ul>
//       </div>

//       {/* Monthly Usage Chart */}
//       <div className="bg-base-100 shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4">Monthly Usage / Amount</h2>
//         <Line data={chartData} />
//       </div>

//       {/* Payment History */}
//       <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
//         <h2 className="text-2xl font-semibold">Payment History</h2>
//         {history.length === 0 ? (
//           <p className="text-base-content/70">No payments yet.</p>
//         ) : (
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map(item => (
//                 <tr key={item._id}>
//                   <td>{item.date}</td>
//                   <td>৳{item.amount}</td>
//                   <td>{item.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Related Bills */}
//       {relatedBills.length > 0 && (
//         <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-3">
//           <h2 className="text-2xl font-semibold">Related Bills</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {relatedBills.map(rb => (
//               <Link
//                 key={rb._id}
//                 to={`/bills/${rb._id}`}
//                 className="bg-base-200 shadow rounded-lg p-4 hover:shadow-lg transition"
//               >
//                 <img
//                   src={categoryImages[rb.category] || categoryImages["Electricity"]}
//                   alt={rb.category}
//                   className="h-32 w-full object-cover rounded-md mb-2"
//                 />
//                 <h3 className="font-semibold">{rb.title}</h3>
//                 <p className="text-sm text-base-content/70">৳{rb.amount}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Pay Bill Button */}
//       <div className="text-center">
//         <button
//           disabled={!isCurrentMonth}
//           onClick={() => setIsOpen(true)}
//           className={`btn btn-primary ${!isCurrentMonth ? "btn-disabled" : ""}`}
//         >
//           Pay Bill
//         </button>
//         {!isCurrentMonth && (
//           <p className="text-red-500 mt-2 text-sm">
//             Only current month bills can be paid.
//           </p>
//         )}
//       </div>

//       {/* ================= MODAL ================= */}
//       {isOpen && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-4">Pay Bill</h3>
//             <form onSubmit={handlePayBill} className="space-y-3">
//               <input type="email" defaultValue={user.email} readOnly className="input input-bordered w-full" />
//               <input type="text" value={_id} readOnly className="input input-bordered w-full" />
//               <input type="number" value={amount} readOnly className="input input-bordered w-full" />
//               <input name="username" placeholder="Your Name" required className="input input-bordered w-full" />
//               <input name="address" placeholder="Address" required className="input input-bordered w-full" />
//               <input name="phone" placeholder="Phone" required className="input input-bordered w-full" />
//               <input type="date" value={new Date().toISOString().split("T")[0]} readOnly className="input input-bordered w-full" />
//               <textarea name="additionalInfo" placeholder="Additional Info (optional)" className="textarea textarea-bordered w-full" />
//               <div className="modal-action">
//                 <button className="btn btn-primary">Submit</button>
//                 <button type="button" onClick={() => setIsOpen(false)} className="btn">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       )}
//     </section>
//   );
// };

// export default BillDetails;










// // import React, { use , useContext, useState } from "react";
// // import { useLoaderData } from "react-router";
// // import { AuthContext } from "../AuthContext/AuthContext";
// // import Swal from "sweetalert2";
// // import useTitle from "../Components/usetTitle";

// // const categoryImages = {
// //   Electricity: "https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
// //   Gas: "https://media.istockphoto.com/id/1344216982/photo/home-heating-gas-expenses-and-bill-statement-document.webp?a=1&b=1&s=612x612&w=0&k=20&c=CMyJq7ky03X0A6rTsZBTA4x_MWt9SjW_arbPpAzNUjY=",
// //   Water: "https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
// //   Internet: "https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
// // };


// // const BillDetails = () => {
// //     useTitle("Bill Details");
// //     const bill = useLoaderData();
// //     const {user} = useContext(AuthContext);
// //     // console.log(user.email);
// //     // console.log(bill);
// //       const [isOpen, setIsOpen] = useState(false);

// //     const {
// //     _id,
// //     title,
// //     category,
// //     location,
// //     description,
// //     amount,
// //     date,
// //     email
// //   } = bill;
// //   const image = categoryImages[category] || "https://via.placeholder.com/400x200?text=Bill+Image";

// //    const billMonth = new Date(date).getMonth();
// //   const currentMonth = new Date().getMonth();
// //   const isCurrentMonth = billMonth === currentMonth;


// //   const handlePayBill = (e)=>{
// //     e.preventDefault();

// //     const form = e.target;
// //     const payData = {
// //           billId: _id,
// //       email: bill.email,
// //       username: form.username.value,
// //       address: form.address.value,
// //       phone: form.phone.value,
// //       amount,
// //       date: new Date().toISOString().split("T")[0],
// //       additionalInfo: form.additionalInfo.value,
// //     } 
    
// //     fetch(`https://utility-bill-sys-server.vercel.app/pay-bills`, {
// //   method: "POST",
// //   headers: { "content-type": "application/json" },
// //   body: JSON.stringify(payData),
// // })
// //   .then(res => res.json())
// //   .then(data => {
// //     if (!data.success) {
// //       Swal.fire("Warning!", data.message, "warning");
// //       return;
// //     }

// //     setIsOpen(false);
// //     Swal.fire("Success!", "Bill paid successfully", "success");
// //   })
// //   .catch(() => {
// //     Swal.fire("Error!", "Something went wrong", "error");
// //   });


// //   }                     


// //     return (
   
// //   <section className="max-w-4xl mx-auto px-4 py-16">

// //       <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden">
// //         <figure className="h-64 overflow-hidden">
// //           <img src={image} alt={title} className="w-full h-full object-cover" />
// //         </figure>
// //         <div className="p-8">
// //           <h2 className="text-3xl font-bold mb-4">{title}</h2>
// //           <p className="mb-2"><strong>Category:</strong> {category}</p>
// //           <p className="mb-2"><strong>Location:</strong> {location}</p>
// //           <p className="mb-4"><strong>Description:</strong> {description}</p>
// //           <p className="mb-2"><strong>Amount:</strong> ৳ {amount}</p>
// //           <p className="mb-6"><strong>Date:</strong> {date}</p>

// //           {/* Pay Bill Button */}
// //           <button
// //             disabled={!isCurrentMonth}
// //             onClick={() => setIsOpen(true)}
// //             className={`btn w-full ${isCurrentMonth ? "btn-primary" : "btn-disabled"}`}
// //           >
// //             Pay Bill
// //           </button>

// //           {!isCurrentMonth && (
// //             <p className="text-red-500 text-sm mt-2 text-center">
// //               Only current month bills can be paid.
// //             </p>
// //           )}
// //         </div>
// //       </div>





// //       {/* ================= MODAL ================= */}
// // {isOpen && (
// //   <dialog open className="modal">
// //     <div className="modal-box">
// //       <h3 className="font-bold text-lg mb-4">Pay Bill</h3>

// //       <form onSubmit={handlePayBill} className="space-y-3">

// //         {/* Email */}
// //         <div>
// //           <label className="block mb-1 font-medium">Email</label>
// //           <input
// //             type="email"
// //             defaultValue={user.email}
// //             // defaultValue={bill.email}
// //             readOnly
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Bill ID */}
// //         <div>
// //           <label className="block mb-1 font-medium">Bill ID</label>
// //           <input
// //             type="text"
// //             value={_id}
// //             readOnly
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Amount */}
// //         <div>
// //           <label className="block mb-1 font-medium">Amount</label>
// //           <input
// //             type="number"
// //             value={amount}
// //             readOnly
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Username */}
// //         <div>
// //           <label className="block mb-1 font-medium">Name</label>
// //           <input
// //             name="username"
// //             placeholder="Your Name"
// //             required
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Address */}
// //         <div>
// //           <label className="block mb-1 font-medium">Address</label>
// //           <input
// //             name="address"
// //             placeholder="Address"
// //             required
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Phone */}
// //         <div>
// //           <label className="block mb-1 font-medium">Phone</label>
// //           <input
// //             name="phone"
// //             placeholder="Phone"
// //             required
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Date */}
// //         <div>
// //           <label className="block mb-1 font-medium">Date</label>
// //           <input
// //             type="date"
// //             value={new Date().toISOString().split("T")[0]}
// //             readOnly
// //             className="input input-bordered w-full"
// //           />
// //         </div>

// //         {/* Additional Info */}
// //         <div>
// //           <label className="block mb-1 font-medium">Additional Info</label>
// //           <textarea
// //             name="additionalInfo"
// //             placeholder="Additional Info (optional)"
// //             className="textarea textarea-bordered w-full"
// //           />
// //         </div>

// //         <div className="modal-action">
// //           <button className="btn btn-primary">Submit</button>
// //           <button
// //             type="button"
// //             onClick={() => setIsOpen(false)}
// //             className="btn"
// //           >
// //             Cancel
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   </dialog>
// // )}




// //     </section>

// //     );
// // };

// // export default BillDetails;