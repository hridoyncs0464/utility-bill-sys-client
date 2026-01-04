import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import React from "react";

const DashboardLayout = () => {
  const { user, logOutUser } = React.useContext(AuthContext);

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-lg hidden md:block">
        <div className="p-4 text-xl font-bold border-b">
          Dashboard
        </div>

        <ul className="menu p-4 space-y-1">
          <li>
            <NavLink to="/dashboard" end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bills">
              All Bills
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              Profile
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-base-100 shadow flex items-center justify-between px-6">
          <h2 className="font-semibold">Welcome, {user?.email}</h2>

          <button
            onClick={logOutUser}
            className="btn btn-sm btn-outline btn-error"
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
