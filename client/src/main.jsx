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
import ConfirmPayment from './components/ConfirmPayment.jsx'
import Consult from './components/Consult.jsx';
import Paymentsuccess from './pages/Paymentsuccess.jsx';
import Auth from './pages/Auth.jsx';
import {Provider, useDispatch} from 'react-redux'
import { store } from './redux/store.js';
import { getUser } from './redux/authSlice.js';
import Protected from './components/Protected.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import CancellationPolicy from './pages/CancellationPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import PaymentGatewaySelector from './pages/PaymentGatewaySelector.jsx';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: '',
          element: <Protected><Home /></Protected>
        },
        {
          path: 'consult',
          element: <Protected><Consult /></Protected>
        },
        {
          path: 'checkout',
          element: <Protected><ConfirmPayment /></Protected>
        },
        {
          path: 'paymentsuccess',
          element: <Protected><Paymentsuccess /></Protected>
        },
        {
          path : 'auth',
          element : <Auth/>
        },
        {
          path : 'about',
          element : <AboutUs/>
        },
        {
          path : 'contact',
          element : <ContactUs/>
        },
        {
          path : 'privacy-policy',
          element : <PrivacyPolicy/>
        },
        {
          path : 'cancellation-policy',
          element : <CancellationPolicy/>
        },
        {
          path : 'termsAndCondition',
          element : <TermsAndConditions/>
        },
        {
          path : 'selectPayment',
          element : <Protected><PaymentGatewaySelector/></Protected>
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
