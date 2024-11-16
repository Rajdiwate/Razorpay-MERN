import { useContext, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/Userinfo'

export default function Consult() {
  const [selectedCountry, setSelectedCountry] = useState('91')
  const [name , setName]  = useState("")
  const [number , setNumber]  = useState()
  const {user , setUser} = useContext(userContext)
  const navigate = useNavigate()

  const countries = [
    { code: '91', name: 'India', flag: '🇮🇳' },
    { code: '1', name: 'United States', flag: '🇺🇸' },
    { code: '44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '61', name: 'Australia', flag: '🇦🇺' },
    { code: '81', name: 'Japan', flag: '🇯🇵' },
  ]

  const handleCheckout = async()=>{
    if(name.length <1 || !number) {
      alert("Incomplete details")
      return
    }

    setUser({name: name , number : number} )
    navigate('/checkout')
  }


  return (
    <div className=" h-screen flex items-start justify-center  ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 mt-10 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Consult with a Doctor</h1>
          <button className="text-gray-400 hover:text-gray-600">
            <Link to="/"><X className="h-6 w-6" /></Link>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Speciality</label>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-800">Dermatology</span>
                </div>
                <span className="text-gray-800">₹449</span>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Patient name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder='Enter Paitent Name '
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile number</label>
              <div className="flex">
                <div className="relative">
                  <select 
                    className="appearance-none bg-white border rounded-l-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} +{country.code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <input
                  type="number"
                  id="number"
                  className="flex-1 px-4 py-2 border border-l-0 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder='Enter mobile number'
                  value={number}
                  onChange={(e)=>{setNumber(e.target.value)}}
                />
              </div>
            </div>
            
            <button className="w-full mt-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors" onClick={handleCheckout}>
              Continue
            </button>
          </div>

          {/* Right Side Illustration */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-20 h-20 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Verified Doctors</h2>
          </div>
        </div>
      </div>
    </div>
  )
}