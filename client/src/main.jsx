import { StrictMode, useEffect } from 'react'
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
import Auth from './pages/Auth.jsx';
import {Provider, useDispatch} from 'react-redux'
import { store } from './redux/store.js';
import { getUser } from './redux/authSlice.js';


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
          path: 'paymentsuccess',
          element: <Paymentsuccess />
        },
        {
          path : 'auth',
          element : <Auth/>
        }
      ]
    }
  ],
);


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getUser action on mount
    dispatch(getUser());
  }, [dispatch]);


  return <RouterProvider router={router} />;
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <UserProvider>
    <App/>
    </UserProvider>
      
    </Provider>
  </StrictMode>,
)