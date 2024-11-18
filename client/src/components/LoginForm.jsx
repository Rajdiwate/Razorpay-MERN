import React, { useContext, useState } from 'react'
import { login as apiLogin } from '../api/auth'
import { useNavigate } from 'react-router-dom'
// import { userContext } from '../context/Userinfo'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/authSlice'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email , setEmail] =useState("")
  const [password , setPassword] = useState("")
  const dispatch = useDispatch()

  const handleLogin = async function(e){
    e.preventDefault()
    const data = await apiLogin({email , password})
    if(data){
      dispatch(getUser())
      navigate('/')
    } 
  }

  return (
    <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email 
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder='Password'
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

        
            </form>
  )
}

export default LoginForm