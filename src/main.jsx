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
        path: "my-pay-bills",
        element: <PrivateRoute>
          <MyPayBills />
        </PrivateRoute>
      },
      {
        path: "bills/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3100/bills/${params.id}`),
        element:
        <PrivateRoute>
         <BillDetails />
        </PrivateRoute>
      
      },
      {
        path: "all-bills",
        loader: () => fetch("http://localhost:3100/all-bills"),
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
