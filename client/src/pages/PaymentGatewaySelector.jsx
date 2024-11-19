import { createCfSession, createOrder, verifyCfPayment } from '../api/payment'
import { useContext, useState } from 'react'
import { CreditCard, Wallet } from 'lucide-react'
import { useNavigate} from "react-router-dom"
import { userContext } from '../context/Userinfo'
import {load} from '@cashfreepayments/cashfree-js'


export default function PaymentGatewaySelector() {
  const [selectedGateway, setSelectedGateway] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(userContext)
  const amount = 499

  const handleGatewaySelection = (gateway) => {
    setSelectedGateway(gateway)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedGateway) {
      setError('Please select a payment gateway')
      return
    }
    if (selectedGateway === 'Razorpay') {
      const order = await createOrder(amount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Testing',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: `${import.meta.env.VITE_API_ENDPOINT}/api/paymentverification`, // Your success URL
        prefill: {
          name: user?.name || "test",
          email: "test@test.com",
          contact: user?.number || '123456789'
        },
        theme: {
          color: '#F37254'
        },
      };

      // console.log(window)
      const rzp = new window.Razorpay(options)
      rzp.open()
    }
    else {
      const sessionDetails = await createCfSession({ amount, number: user.number })
      const sessionId = sessionDetails.payment_session_id

      const cashfree = await load({
        mode: "production" //or production
      });

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal", //optional ( _self, _blank, or _top)   
      }

      cashfree.checkout(checkoutOptions).then(()=>{
        console.log("Payment initialized")
        verifyCfPayment(sessionDetails.order_id).then((res)=>{
          if(res){
            alert("payment success")
          }
          else{
            alert("payment failed please try again")
          }
          navigate('/')
        })
      })

    }
  }

  return (
    <div className='flex  justify-center items-center flex-1 overflow-hidden mt-20'>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Payment Method</h2>
          <p className="text-gray-600 mb-6">Select your preferred payment method to proceed</p>
          <div className="space-y-4">
            <button
              className={`w-full flex items-center justify-start px-4 py-3 rounded-md transition-colors ${selectedGateway === 'Cashfree'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={() => handleGatewaySelection('Cashfree')}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Cashfree
            </button>
            <button
              className={`w-full flex items-center justify-start px-4 py-3 rounded-md transition-colors ${selectedGateway === 'Razorpay'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={() => handleGatewaySelection('Razorpay')}
            >
              <Wallet className="mr-3 h-5 w-5" />
              Razorpay
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          <button
            className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            onClick={handleSubmit}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  )
}