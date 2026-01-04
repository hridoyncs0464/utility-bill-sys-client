// src/Pages/DashboardOverview.jsx
import React, { useEffect, useState } from "react";
import useTitle from "../Components/usetTitle";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardOverview = () => {
  useTitle("Dashboard Overview");

  const [stats, setStats] = useState({
    totalBills: 0,
    totalAmount: 0,
    maxBill: 0,
  });

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("https://utility-bill-sys-server.vercel.app/all-bills")
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        const totalAmount = data.reduce((sum, b) => sum + b.amount, 0);
        const maxBill = Math.max(...data.map((b) => b.amount));
        setStats({
          totalBills: data.length,
          totalAmount,
          maxBill,
        });
      });
  }, []);

  // Chart Data
  const categories = [...new Set(bills.map((b) => b.category))];
  const amountsPerCategory = categories.map((cat) =>
    bills.filter((b) => b.category === cat).reduce((sum, b) => sum + b.amount, 0)
  );
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Total Amount per Category",
        data: amountsPerCategory,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Category-wise Total Bill Amount" },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-lg font-semibold">Total Bills</h2>
          <p className="text-3xl font-bold">{stats.totalBills}</p>
        </div>
        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-lg font-semibold">Total Amount</h2>
          <p className="text-3xl font-bold">৳{stats.totalAmount}</p>
        </div>
        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-lg font-semibold">Highest Bill</h2>
          <p className="text-3xl font-bold">৳{stats.maxBill}</p>
        </div>
      </div>

      <div className="bg-base-100 shadow rounded-lg p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardOverview;


// import React, { useEffect, useState } from "react";
// import useTitle from "../Components/usetTitle";

// const DashboardOverview = () => {
//   useTitle("Dashboard Overview");

//   const [stats, setStats] = useState({
//     totalBills: 0,
//     totalAmount: 0,
//     maxBill: 0,
//   });

//   useEffect(() => {
//     fetch("https://utility-bill-sys-server.vercel.app/all-bills")
//       .then(res => res.json())
//       .then(data => {
//         const totalAmount = data.reduce((sum, b) => sum + b.amount, 0);
//         const maxBill = Math.max(...data.map(b => b.amount));

//         setStats({
//           totalBills: data.length,
//           totalAmount,
//           maxBill,
//         });
//       });
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="card bg-base-100 shadow p-6">
//           <h2 className="text-lg font-semibold">Total Bills</h2>
//           <p className="text-3xl font-bold">{stats.totalBills}</p>
//         </div>

//         <div className="card bg-base-100 shadow p-6">
//           <h2 className="text-lg font-semibold">Total Amount</h2>
//           <p className="text-3xl font-bold">৳{stats.totalAmount}</p>
//         </div>

//         <div className="card bg-base-100 shadow p-6">
//           <h2 className="text-lg font-semibold">Highest Bill</h2>
//           <p className="text-3xl font-bold">৳{stats.maxBill}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;
