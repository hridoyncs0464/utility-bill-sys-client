import React from "react";
import { Link, NavLink } from "react-router";
import Recentbills from "./Recentbills";
import useTitle from "../Components/usetTitle";
import WhyChooseUs from "../Components/WhyChooseUs";
import HowItWorks from "../Components/HowItWorks";
const RecentbillsPromise =  fetch('http://localhost:3100/recent-bills').then(res => res.json());

const Home = () => {
 useTitle("Home");

  return (
    <div>
      {/* ===== Banner Carousel Section ===== */}
      <section className="max-w-7xl mx-auto px-4 mt-3">
        <div className="carousel w-full h-[420px] rounded-xl overflow-hidden">

          {/* ===== Slide 1 ===== */}
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://media.istockphoto.com/id/2078490118/photo/businessman-using-laptop-to-online-payment-banking-and-online-shopping-financial-transaction.webp?a=1&b=1&s=612x612&w=0&k=20&c=gFVtiayH02VWwnw3auJt-duSGp-kM4ZLu9OCPvHHNrU="
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="text-white px-10 max-w-xl">
                <h2 className="text-4xl font-bold">
                  Pay Utility Bills Easily
                </h2>
                <p className="mt-3">
                  Manage Electricity, Gas, Water, and Internet bills from one
                  secure platform.
                </p>
                <NavLink  to="/all-bills" className="btn btn-primary mt-5">
                  View Bills
                </NavLink>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>

          {/* ===== Slide 2 ===== */}
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1625980344922-a4df108b2bd0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXRpbGl0eSUyMGJpbGx8ZW58MHx8MHx8fDA%3D"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="text-white px-10 max-w-xl">
                <h2 className="text-4xl font-bold">
                  Pay Only Current Month Bills
                </h2>
                <p className="mt-3">
                  The system ensures you can pay bills only for the current
                  month, avoiding advance or outdated payments.
                </p>
                <Link to="/bills" className="btn btn-primary mt-5">
                  Pay Now
                </Link>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>

          {/* ===== Slide 3 ===== */}
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1571867424488-4565932edb41?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fG9ubGluZSUyMHBheXxlbnwwfHwwfHx8MA%3D%3D"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="text-white px-10 max-w-xl">
                <h2 className="text-4xl font-bold">
                  Track & Download Payment Reports
                </h2>
                <p className="mt-3">
                  View your paid bill history and download PDF reports anytime
                  for future reference.
                </p>
                <Link to="/my-pay-bills" className="btn btn-primary mt-5">
                  My Pay Bills
                </Link>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>

        </div>
      </section>


{/* ===== Category Section (Static) ===== */}
<section className="max-w-7xl mx-auto px-4 py-5">
  <div className="text-center mb-10">
    <h2 className="text-5xl font-bold text-gray-800">
      Utility <span className="text-primary">Bill</span> Categories
    </h2>
    <p className="mt-3  font-bold text-2xl text-gray-600">
      Different types of utility bills supported by the system.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

    {/* Electricity */}
    <div className="card bg-base-100 shadow-md">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RWxlY3RyaWNpdHklMjBiaWxsfGVufDB8fDB8fHww"
          alt="Electricity"
          className="h-50"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Electricity</h3>
        <p className="text-gray-600">
          Monthly electricity bill management and payment.
        </p>
      </div>
    </div>

    {/* Gas */}
    <div className="card bg-base-100 shadow-md">
      <figure className="p-6">
        <img
          src="https://media.istockphoto.com/id/1344216982/photo/home-heating-gas-expenses-and-bill-statement-document.webp?a=1&b=1&s=612x612&w=0&k=20&c=CMyJq7ky03X0A6rTsZBTA4x_MWt9SjW_arbPpAzNUjY="
          alt="Gas"
          className="h-50"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Gas</h3>
        <p className="text-gray-600">
          Household gas bill tracking and records.
        </p>
      </div>
    </div>

    {/* Water */}
    <div className="card bg-base-100 shadow-md">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBnbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Water"
          className="h-50"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Water</h3>
        <p className="text-gray-600">
          Water usage bills and monthly payment overview.
        </p>
      </div>
    </div>

    {/* Internet */}
    <div className="card bg-base-100 shadow-md">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGludGVybmV0fGVufDB8fDB8fHww"
          alt="Internet"
          className="h-50"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Internet</h3>
        <p className="text-gray-600">
          Internet subscription and broadband bill details.
        </p>
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
