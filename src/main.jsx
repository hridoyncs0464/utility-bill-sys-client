import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Bills from "./Pages/Bills.jsx";
import Home from "./Pages/Home.jsx";
import RootLayout from "./Layouts/RootLayout.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AuthProvider from "./AuthContext/AuthProvider";
import MyPayBills from "./Pages/MyPayBills.jsx";
import BillDetails from "./Pages/BillDetails.jsx";
import Loading from "./Components/Loding.jsx";
import AllBills from "./Pages/AllBills.jsx";
import Notfound from "./Pages/Notfound.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import DashboardOverview from "./Pages/DashboardOverview.jsx";
import DashboardBills from "./Pages/DashboardBills.jsx";
import Profile from "./Pages/Profile.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Privacy from "./Pages/Privacy.jsx";
import Terms from "./Pages/Terms.jsx";
import Help from "./Pages/Help.jsx";
// import Dashboard from "./Pages/Dashboard.jsx";
// import DashboardOverview from "./Layouts/DashboardLayout.jsx";
         

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "bills",
        element: <Bills />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

 {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "privacy",
    element: <Privacy />,
  },
{
  path: "terms",
  element: <Terms />,
},
{
  path: "help",
  element: <Help />,
},

      {
        path: "my-pay-bills",
        element: <PrivateRoute>
          <MyPayBills />
        </PrivateRoute>
      },

{
  path: "dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardOverview />,
    },
    {
      path: "bills",
      element: <DashboardBills />,
    },
  ],
},
 {
  path: "profile",
  element: (
    <PrivateRoute>
      <Profile/>
    </PrivateRoute>
  ),
},


      {
        path: "bills/:id",
        loader: ({ params }) =>
          fetch(`https://utility-bill-sys-server.vercel.app/bills/${params.id}`),
        element:
        <PrivateRoute>
         <BillDetails />
        </PrivateRoute>
      
      },
      {
        path: "all-bills",
        loader: () => fetch("https://utility-bill-sys-server.vercel.app/all-bills"),
        element: <AllBills />,
      },
      {

         path:"*",
         element:<Notfound></Notfound>

      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}
        fallbackElement={<Loading message="Preparing application..." />}
       />
      
    </AuthProvider>
  </StrictMode>
);
