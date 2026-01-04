// src/Pages/DashboardBills.jsx
import React, { useEffect, useState } from "react";
import useTitle from "../Components/usetTitle.js";
import Loading from "../Components/Loding.jsx";
import { Link } from "react-router";

const DashboardBills = () => {
  useTitle("Dashboard Bills");

  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amountFilter, setAmountFilter] = useState("all");

  useEffect(() => {
    fetch("https://utility-bill-sys-server.vercel.app/all-bills")
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        setFilteredBills(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...bills];

    if (amountFilter === "below1000") result = bills.filter((b) => b.amount < 1000);
    else if (amountFilter === "1000to5000")
      result = bills.filter((b) => b.amount >= 1000 && b.amount <= 5000);
    else if (amountFilter === "above5000") result = bills.filter((b) => b.amount > 5000);

    setFilteredBills(result);
  }, [amountFilter, bills]);

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">All Bills</h2>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-outline btn-primary">
            Filter by Amount
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={() => setAmountFilter("all")}>All Bills</button>
            </li>
            <li>
              <button onClick={() => setAmountFilter("below1000")}>Below ৳1000</button>
            </li>
            <li>
              <button onClick={() => setAmountFilter("1000to5000")}>৳1000 – ৳5000</button>
            </li>
            <li>
              <button onClick={() => setAmountFilter("above5000")}>Above ৳5000</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full bg-base-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Amount (৳)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-base-content/70">
                  No bills found for this filter
                </td>
              </tr>
            ) : (
              filteredBills.map((bill, index) => (
                <tr key={bill._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{bill.title}</td>
                  <td>{bill.category}</td>
                  <td>{bill.location}</td>
                  <td>৳{bill.amount}</td>
                  <td>{bill.date}</td>
                  <td>
                    <Link
                      to={`/bills/${bill._id}`}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardBills;



// import React, { useEffect, useState } from "react";
// import useTitle from "../Components/usetTitle.js";
// import Loading from "../Components/Loding.jsx";
// import { Link } from "react-router";

// const DashboardBills = () => {
//   useTitle("Dashboard");

//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [amountFilter, setAmountFilter] = useState("all");

//   // Fetch bills
//   useEffect(() => {
//     fetch("https://utility-bill-sys-server.vercel.app/all-bills")
//       .then(res => res.json())
//       .then(data => {
//         setBills(data);
//         setFilteredBills(data);
//         setLoading(false);
//       });
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     let result = [...bills];

//     if (amountFilter === "below1000") {
//       result = bills.filter(b => b.amount < 1000);
//     } else if (amountFilter === "1000to5000") {
//       result = bills.filter(b => b.amount >= 1000 && b.amount <= 5000);
//     } else if (amountFilter === "above5000") {
//       result = bills.filter(b => b.amount > 5000);
//     }

//     setFilteredBills(result);
//   }, [amountFilter, bills]);

//   if (loading) return <Loading message="Loading dashboard..." />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-3xl font-bold">Dashboard  All Bills</h1>

//         {/* ✅ Advanced Dropdown Filter */}
//         <div className="dropdown dropdown-end mt-4 md:mt-0">
//           <label tabIndex={0} className="btn btn-outline btn-primary">
//             Filter by Amount
//           </label>
//           <ul
//             tabIndex={0}
//             className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
//           >
//             <li><button onClick={() => setAmountFilter("all")}>All Bills</button></li>
//             <li><button onClick={() => setAmountFilter("below1000")}>Below ৳1000</button></li>
//             <li><button onClick={() => setAmountFilter("1000to5000")}>৳1000 – ৳5000</button></li>
//             <li><button onClick={() => setAmountFilter("above5000")}>Above ৳5000</button></li>
//           </ul>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="table w-full bg-base-100">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Location</th>
//               <th>Amount (৳)</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredBills.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-base-content/70">
//                   No bills found for this filter
//                 </td>
//               </tr>
//             ) : (
//               filteredBills.map((bill, index) => (
//                 <tr key={bill._id} className="hover">
//                   <td>{index + 1}</td>
//                   <td>{bill.title}</td>
//                   <td>{bill.category}</td>
//                   <td>{bill.location}</td>
//                   <td>৳{bill.amount}</td>
//                   <td>{bill.date}</td>
//                   <td>
//                     <Link
//                       to={`/bills/${bill._id}`}
//                       className="btn btn-sm btn-outline btn-primary"
//                     >
//                       Details
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardBills;


// // import React, { useEffect, useState } from "react";
// // import useTitle from "../Components/usetTitle";
// // import Loading from "../Components/Loding.jsx";
// // import { Link } from "react-router";

// // const Dashboard = () => {
// //   useTitle("Dashboard");

// //   const [bills, setBills] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //  const [amountFilter, setAmountFilter] = useState("all");

// //   // Fetch all bills from server
// //   useEffect(() => {
// //     fetch("https://utility-bill-sys-server.vercel.app/all-bills")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setBills(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch bills:", err);
// //         setLoading(false);
// //       });
// //   }, []);
  
// //   // filtering

// //   useEffect(()=>{
// //     let result  = [...bills];
// //       if(amountFilter === "below1000"){
// //         result = bills.filter(b => b.amount < 1000);

// //       }
// //       else if( amountFilter === "1000to5000"){
// //         result = bills.filter( b => b.amount >= 1000 && b.amount <= 5000 );
 
// //        } 
// //        else if(amountFilter === "above5000"){
// //         result = bills.filter(b => b.amount > 5000 );

// //        }
// //   setAmountFilter(result);

// //    },[amountFilter,bills]);

   
// //   if (loading) return <Loading message="Loading dashboard..." />;

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-6">
// //       <h1 className="text-3xl font-bold mb-6">Dashboard: All Bills</h1>

// //       {bills.length === 0 ? (
// //         <p className="text-center text-lg text-base-content/70">
// //           No bills found.
// //         </p>
// //       ) : (
// //         <div className="overflow-x-auto shadow-md rounded-lg">
// //           <table className="table w-full bg-base-100">
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Title</th>
// //                 <th>Category</th>
// //                 <th>Location</th>
// //                 <th>Amount (৳)</th>
// //                 <th>Date</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {bills.map((bill, index) => (
// //                 <tr key={bill._id} className="hover">
// //                   <td>{index + 1}</td>
// //                   <td>{bill.title}</td>
// //                   <td>{bill.category}</td>
// //                   <td>{bill.location}</td>
// //                   <td>{bill.amount}</td>
// //                   <td>{bill.date}</td>
// //                   <td>
// //                     <Link
// //                       to={`/bills/${bill._id}`}
// //                       className="btn btn-sm btn-outline btn-primary"
// //                     >
// //                       Details
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
