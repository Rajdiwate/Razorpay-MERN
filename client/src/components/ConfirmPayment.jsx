import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userContext } from "../context/Userinfo"
import {createCfSession, verifyCfPayment} from '../api/payment'
import {load} from '@cashfreepayments/cashfree-js'


export default function ConfirmPayment() {
  
  const {user , amount} = useContext(userContext)
  
  const handlePayment = async(e)=>{
    e.preventDefault()
    const sessionDetails = await createCfSession({ amount, number: user.number })
      const sessionId = sessionDetails.payment_session_id

      const cashfree = await load({
        mode: "production" //or sandbox
      });

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_self", //optional ( _self,_modal ,  _blank, or _top)   
      }

      cashfree.checkout(checkoutOptions).then(async()=>{
        console.log("Payment initialized")
        await verifyCfPayment(sessionDetails.order_id)
       })
  }
  
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link to= "/consult"><button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button></Link>
              <h1 className="text-xl font-semibold text-gray-800">Confirm & Pay</h1>
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <Link to="/consult"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg></Link>
            </button>
          </div>
  
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Doctors Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-gray-800">Verified Dermatologists online now</h2>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white" />
                    ))}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-2 border-white text-sm text-gray-600">
                      +143
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">One of them will speak to you shortly.</p>
                
                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-gray-700">93% of users found online consultation helpful</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">Consultation will happen only on mobile app</span>
                  </div>
                </div>
              </div>
  
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Patient name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient name"
                    defaultValue={user?.name}
                  />
                </div>
                
                <button className="text-blue-500 hover:text-blue-600">
                  Have a coupon code?
                </button>
                
                <div>
                  <label className="block text-gray-700 mb-2">Final Fee</label>
                  <div className="text-2xl font-bold">{`₹${amount}`}</div>
                </div>
                
               
                <button onClick={handlePayment} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors" >
                  Continue to payment
                </button>
                
              </div>
            </div>
  
            {/* Right Side */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">₹</span>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full" />
              </div>
              
              <h3 className="text-xl font-semibold">3x more affordable!</h3>
              <p className="text-gray-600 max-w-sm">
                Get affordable healthcare online, with fees upto 3 times lesser than in clinic fees.
              </p>
            </div>
          </div>
  
          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm space-y-1">
            <p>Practo Guarantee: 100% Money back if no response</p>
            <p>Not for emergency use</p>
          </div>
        </div>
      </div>
    )
  }