import React, { useState } from 'react'
import { register } from '../api/auth';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/authSlice';

const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name , setName] = useState("");
  const [email , setEmail] =useState("")
  const [password , setPassword] = useState("")

  const handleRegister = async function(e){
    e.preventDefault()
    const data = await register({name , email , password});
    if(data){
      dispatch(getUser())
      navigate('/')
    }
  }



  return (
    <form className="space-y-6">
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder='Enter your name'
        required
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
      />
    </div>

    <div>
      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="register-email"
        name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder='Enter your email'
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
      />
    </div>

    <div>
      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        id="register-password"
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
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  </form>
  )
}

export default RegisterForm