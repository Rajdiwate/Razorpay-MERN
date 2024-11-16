import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {UserProvider} from "./context/Userinfo.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import Home from './components/Home.jsx';
import ConfirmPayment from './components/ConfirmPayment.jsx';
import Consult from './components/Consult.jsx';
import Paymentsuccess from './pages/Paymentsuccess.jsx';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'consult',
          element: <Consult />
        },
        {
          path: 'checkout',
          element: <ConfirmPayment />
        },
        {
          path: '/paymentsuccess',
          element: <Paymentsuccess />
        }
      ]
    }
  ],
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
  <RouterProvider router={router}/>
  </UserProvider>
  </StrictMode>,
)
