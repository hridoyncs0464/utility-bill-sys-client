import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Recentbills from "./Recentbills";
import useTitle from "../Components/usetTitle";
import WhyChooseUs from "../Components/WhyChooseUs";
import HowItWorks from "../Components/HowItWorks";

const slides = [
  {
    id: 1,
    title: "Pay Utility Bills Easily",
    subtitle: "Manage Electricity, Gas, Water, and Internet bills from one secure platform.",
    img: "https://media.istockphoto.com/id/1433767185/photo/high-natural-gas-prices-in-turkey.jpg?s=2048x2048&w=is&k=20&c=kj-DZ46OkzEr-UDn4DBX-OrjeE00KCj5x8-MAVlOIIg=",
    btnText: "View Bills",
    btnLink: "/all-bills",
  },
  {
    id: 2,
    title: "Pay Only Current Month Bills",
    subtitle: "The system ensures you can pay bills only for the current month, avoiding advance or outdated payments.",
    img: "https://media.istockphoto.com/id/1365317443/photo/electricity-bill.jpg?s=612x612&w=is&k=20&c=nTZuheeWIWbLBJDWBG06JY70hnLz_UbdAgCdxkEjpQM=",
    btnText: "Pay Now",
    btnLink: "/bills",
  },
  {
    id: 3,
    title: "Track & Download Payment Reports",
    subtitle: "View your paid bill history and download PDF reports anytime for future reference.",
    img: "https://media.istockphoto.com/id/1866128064/photo/payment-successful.jpg?s=2048x2048&w=is&k=20&c=F1FwACl_NsbWpwZXPLyMjNF0Q9wlRSGT-XobJpP_8mw=",
    btnText: "My Pay Bills",
    btnLink: "/my-pay-bills",
  },
];

const RecentbillsPromise = fetch(
  "https://utility-bill-sys-server.vercel.app/recent-bills"
).then((res) => res.json());

const Home = () => {
  useTitle("Home");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div>
      {/* ===== Dynamic Carousel ===== */}
      <section className="max-w-7xl mx-auto px-4 mt-3">
        <div className="relative w-full h-[420px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center px-10">
                <div className="text-white max-w-xl">
                  <h2 className="text-4xl font-bold">{slide.title}</h2>
                  <p className="mt-3">{slide.subtitle}</p>
                  <NavLink to={slide.btnLink} className="btn btn-primary mt-5">
                    {slide.btnText}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-5 -translate-y-1/2">
            <button onClick={handlePrev} className="btn btn-circle">
              ❮
            </button>
          </div>
          <div className="absolute top-1/2 right-5 -translate-y-1/2">
            <button onClick={handleNext} className="btn btn-circle">
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* ===== Category Section (Static) ===== */}
      <section className="max-w-7xl mx-auto px-4 py-5">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-base-content">
            Utility <span className="text-primary">Bill</span> Categories
          </h2>
          <p className="mt-3 font-bold text-2xl text-base-content/70">
            Different types of utility bills supported by the system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Electricity */}
          <div className="card bg-base-100 shadow-md">
            <figure className="p-6">
              <img
                src="https://images.unsplash.com/photo-1663608786776-72e279f45a95?auto=format&fit=crop&w=600&q=80"
                alt="Electricity"
                className="h-50 w-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold">Electricity</h3>
              <p className="text-base-content/70">Monthly electricity bill management and payment.</p>
            </div>
          </div>

          {/* Gas */}
          <div className="card bg-base-100 shadow-md">
            <figure className="p-6">
              <img
                src="https://images.unsplash.com/photo-1607324772107-8ad6740ca195?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gas"
                className="h-50 w-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold">Gas</h3>
              <p className="text-base-content/70">Household gas bill tracking and records.</p>
            </div>
          </div>

          {/* Water */}
          <div className="card bg-base-100 shadow-md">
            <figure className="p-6">
              <img
                src="https://images.unsplash.com/photo-1554140426-5e830b73a5e8?auto=format&fit=crop&w=600&q=80"
                alt="Water"
                className="h-50 w-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold">Water</h3>
              <p className="text-base-content/70">Water usage bills and monthly payment overview.</p>
            </div>
          </div>

          {/* Internet */}
          <div className="card bg-base-100 shadow-md">
            <figure className="p-6">
              <img
                src="https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?auto=format&fit=crop&w=600&q=80"
                alt="Internet"
                className="h-50 w-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold">Internet</h3>
              <p className="text-base-content/70">Internet subscription and broadband bill details.</p>
            </div>
          </div>
        </div>
      </section>

      <div>
        <Recentbills RecentbillsPromise={RecentbillsPromise}></Recentbills>
      </div>

      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;













// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router";
// import Recentbills from "./Recentbills";
// import useTitle from "../Components/usetTitle";
// import WhyChooseUs from "../Components/WhyChooseUs";
// import HowItWorks from "../Components/HowItWorks";

// const slides = [
//   {
//     id: 1,
//     title: "Pay Utility Bills Easily",
//     subtitle: "Manage Electricity, Gas, Water, and Internet bills from one secure platform.",
//     img: "https://media.istockphoto.com/id/2078490118/photo/businessman-using-laptop-to-online-payment-banking-and-online-shopping-financial-transaction.webp?a=1&b=1&s=612x612&w=0&k=20&c=gFVtiayH02VWwnw3auJt-duSGp-kM4ZLu9OCPvHHNrU=",
//     btnText: "View Bills",
//     btnLink: "/all-bills",
//   },
//   {
//     id: 2,
//     title: "Pay Only Current Month Bills",
//     subtitle:
//       "The system ensures you can pay bills only for the current month, avoiding advance or outdated payments.",
//     img: "https://images.unsplash.com/photo-1625980344922-a4df108b2bd0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXRpbGl0eSUyMGJpbGx8ZW58MHx8MHx8fDA%3D",
//     btnText: "Pay Now",
//     btnLink: "/bills",
//   },
//   {
//     id: 3,
//     title: "Track & Download Payment Reports",
//     subtitle:
//       "View your paid bill history and download PDF reports anytime for future reference.",
//     img: "https://images.unsplash.com/photo-1571867424488-4565932edb41?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fG9ubGluZSUyMHBheXxlbnwwfHwwfHx8MA%3D%3D",
//     btnText: "My Pay Bills",
//     btnLink: "/my-pay-bills",
//   },
// ];

// const RecentbillsPromise = fetch(
//   "https://utility-bill-sys-server.vercel.app/recent-bills"
// ).then((res) => res.json());

// const Home = () => {
//   useTitle("Home");
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000); // 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   return (
//     <div>
//       {/* ===== Dynamic Carousel ===== */}
//       <section className="max-w-7xl mx-auto px-4 mt-3">
//         <div className="relative w-full h-[420px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
//           {slides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`absolute w-full h-full transition-opacity duration-1000 ${
//                 index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
//               }`}
//             >
//               <img
//                 src={slide.img}
//                 alt={slide.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/50 flex items-center px-10">
//                 <div className="text-white max-w-xl">
//                   <h2 className="text-4xl font-bold">{slide.title}</h2>
//                   <p className="mt-3">{slide.subtitle}</p>
//                   <NavLink to={slide.btnLink} className="btn btn-primary mt-5">
//                     {slide.btnText}
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Navigation Arrows */}
//           <div className="absolute top-1/2 left-5 -translate-y-1/2">
//             <button onClick={handlePrev} className="btn btn-circle">
//               ❮
//             </button>
//           </div>
//           <div className="absolute top-1/2 right-5 -translate-y-1/2">
//             <button onClick={handleNext} className="btn btn-circle">
//               ❯
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ===== Category Section (Static) ===== */}
//       <section className="max-w-7xl mx-auto px-4 py-5">
//         <div className="text-center mb-10">
//           <h2 className="text-5xl font-bold text-base-content">
//             Utility <span className="text-primary">Bill</span> Categories
//           </h2>
//           <p className="mt-3 font-bold text-2xl text-base-content/70">
//             Different types of utility bills supported by the system.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
//           {/* Electricity */}
//           <div className="card bg-base-100 shadow-md">
//             <figure className="p-6">
//               <img
//                 src="https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=400&auto=format&fit=crop&q=60"
//                 alt="Electricity"
//                 className="h-50"
//               />
//             </figure>
//             <div className="card-body text-center">
//               <h3 className="text-xl font-semibold">Electricity</h3>
//               <p className="text-base-content/70">
//                 Monthly electricity bill management and payment.
//               </p>
//             </div>
//           </div>

//           {/* Gas */}
//     <div className="card bg-base-100 shadow-md">
//   <figure className="p-6">
//     <img
//       src="https://images.unsplash.com/photo-1593085512472-8b9b1c9f3b3d?auto=format&fit=crop&w=600&q=80"
//       alt="Gas"
//       className="h-50 w-full object-cover rounded-md"
//     />
//   </figure>
//   <div className="card-body text-center">
//     <h3 className="text-xl font-semibold">Gas</h3>
//     <p className="text-base-content/70">
//       Household gas bill tracking and records.
//     </p>
//   </div>
// </div>

//           {/* Water */}
//           <div className="card bg-base-100 shadow-md">
//             <figure className="p-6">
//               <img
//                 src="https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=400&auto=format&fit=crop&q=60"
//                 alt="Water"
//                 className="h-50"
//               />
//             </figure>
//             <div className="card-body text-center">
//               <h3 className="text-xl font-semibold">Water</h3>
//               <p className="text-base-content/70">
//                 Water usage bills and monthly payment overview.
//               </p>
//             </div>
//           </div>

//           {/* Internet */}
//           <div className="card bg-base-100 shadow-md">
//             <figure className="p-6">
//               <img
//                 src="https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=400&auto=format&fit=crop&q=60"
//                 alt="Internet"
//                 className="h-50"
//               />
//             </figure>
//             <div className="card-body text-center">
//               <h3 className="text-xl font-semibold">Internet</h3>
//               <p className="text-base-content/70">
//                 Internet subscription and broadband bill details.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div>
//         <Recentbills RecentbillsPromise={RecentbillsPromise}></Recentbills>
//       </div>

//       <WhyChooseUs></WhyChooseUs>
//       <HowItWorks></HowItWorks>
//     </div>
//   );
// };

// export default Home;
