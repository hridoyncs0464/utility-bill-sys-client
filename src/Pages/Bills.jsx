import React from "react";
import { Link } from "react-router";
import useTitle from "../Components/usetTitle";

export const categoryImages = {
  Electricity: "https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  Gas: "https://media.istockphoto.com/id/1344216982/photo/home-heating-gas-expenses-and-bill-statement-document.webp?a=1&b=1&s=612x612&w=0&k=20&c=CMyJq7ky03X0A6rTsZBTA4x_MWt9SjW_arbPpAzNUjY=",
  Water: "https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  Internet: "https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
};

const Bills = ({ recentBill }) => {
  useTitle("Bills");

  // if (!recentBill) return null;
  
  if (!recentBill) return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1,2,3,4].map((i) => (
        <div key={i} className="h-80 bg-base-200 rounded-lg"></div>
      ))}
    </div>
  );

  const { _id, title, category, location, date, amount } = recentBill;


    const image = categoryImages[category] || "https://via.placeholder.com/400x200?text=Bill+Image";

  return (
  
<div className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      <figure className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </figure>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {/* <p className="text-sm text-base-content/70 mb-1">
          {description?.slice(0, 60)}...
        </p> */}

        <div className="mt-auto space-y-1 text-sm text-base-content/70">
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Amount:</strong> ৳{amount}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>

        <Link
          to={`/bills/${_id}`}
          className="btn btn-outline btn-primary btn-sm mt-3 w-full"
        >
          View Details
        </Link>
      </div>
    </div>


  //  <div className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
  //     <figure className="h-48 overflow-hidden">
  //       <img
  //         src={image || "https://via.placeholder.com/400x200?text=Bill+Image"}
  //         alt={title}
  //         className="w-full h-full object-cover"
  //       />
  //     </figure>

  //     <div className="p-5 flex flex-col flex-1">
  //       <h3 className="text-lg font-semibold mb-2">{title}</h3>

  //       <p className="text-sm text-base-content/70 mb-1">
  //         {recentBill.description?.slice(0, 60)}...
  //       </p>

  //       <div className="mt-auto space-y-1 text-sm text-base-content/70">
  //         <p><strong>Category:</strong> {category}</p>
  //         <p><strong>Location:</strong> {location}</p>
  //         <p><strong>Amount:</strong> ৳{amount}</p>
  //         <p><strong>Date:</strong> {date}</p>
  //       </div>

  //       <Link
  //         to={`/bills/${_id}`}
  //         className="btn btn-outline btn-primary btn-sm mt-3 w-full"
  //       >
  //         View Details
  //       </Link>
  //     </div>
  //   </div>
  
  
  
  // <div className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
  //     <div className="p-5">
  //       <h3 className="text-lg font-semibold mb-2 text-base-content">
  //         {title}
  //       </h3>

  //       <p className="text-sm text-base-content/70">
  //         <strong>Category:</strong> {category}
  //       </p>

  //       <p className="text-sm text-base-content/70">
  //         <strong>Location:</strong> {location}
  //       </p>

  //       <p className="text-sm text-base-content/70">
  //         <strong>Amount:</strong> ৳{amount}
  //       </p>

  //       <p className="text-sm text-base-content/70 mb-4">
  //         <strong>Date:</strong> {date}
  //       </p>

  //       <Link
  //         to={`/bills/${_id}`}
  //         className="btn btn-outline btn-primary btn-sm w-full"
  //       >
  //         See Details
  //       </Link>
  //     </div>
  //   </div>
  );
};



export default Bills;


// const Bills = ({ recentBill }) => {
//   if (!recentBill) return null;

//   const { _id, title, category, location, date, amount, image } = recentBill;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//       <div className="p-5">
//         <h3 className="text-lg font-semibold mb-2">{title}</h3>

//         <p className="text-sm text-base-content/70">
//           <strong>Category:</strong> {category}
//         </p>

//         <p className="text-sm text-base-content/70">
//           <strong>Location:</strong> {location}
//         </p>

//         <p className="text-sm text-base-content/70">
//           <strong>Amount:</strong> ৳{amount}
//         </p>

//         <p className="text-sm text-base-content/70 mb-4">
//           <strong>Date:</strong> {date}
//         </p>

//         <Link
//           to={`/bills/${_id}`}
//           className="btn btn-outline btn-primary btn-sm w-full"
//         >
//           See Details
//         </Link>
//       </div>
//     </div>
//   );
// };