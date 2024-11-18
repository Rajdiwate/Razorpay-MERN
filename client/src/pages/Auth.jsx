import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'


export default function Auth() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl w-full flex gap-8 items-center">
        {/* Left side illustration */}
        <div className="hidden lg:block w-1/2 p-20">
          <img
            src="https://accounts.practo.com/static/images/illustration.png"
            alt="Medical illustration"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Right side form */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Tab navigation */}
          <div className="flex justify-center mb-8 border-b">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-6 py-2 ${
                activeTab === 'login'
                  ? 'text-cyan-500 border-b-2 border-cyan-500'
                  : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-6 py-2 ${
                activeTab === 'register'
                  ? 'text-cyan-500 border-b-2 border-cyan-500'
                  : 'text-gray-500'
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <LoginForm/>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <RegisterForm/>
          )}
        </div>
      </div>
    </div>
  )
}