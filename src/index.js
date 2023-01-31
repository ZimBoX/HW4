import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './bootstrap.min.css'
import './index.css';

import Root from './routes/Root/Root';
import MainPage from './routes/MainPage/MainPage';
import AdminPanel from './routes/AdminPanel/AdminPanel';
import Login from './routes/Login/Login';
import Registration from './routes/Registration/Registration';

import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
    {
      path: "/main",
      element: <MainPage />
    },
    {
      path: "/admin",
      element: <AdminPanel />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/registration",
      element: <Registration />
    },
  ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
