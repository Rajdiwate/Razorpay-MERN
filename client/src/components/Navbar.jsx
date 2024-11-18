import { ChevronDown } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
// import { userContext } from '../context/Userinfo';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {isAuthenticated}= useSelector(state=>state.user)
    const [activeDropdown, setActiveDropdown] = useState(null);



    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <header className="border-b px-10">
            <div className="container mx-auto  px-20  flex items-center justify-between py-3">
                <div className="flex items-center space-x-8">
                    {/* <img src="/placeholder.svg" alt="Practo logo" width={100} height={30} className="w-24" /> */}
                    <Link to="/">PRACTO</Link>
                    <nav className="hidden md:flex space-x-6 text-base">
                        <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-semibold">Find Doctors</a>
                        <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-semibold">Video Consult</a>
                        <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-semibold">Surgeries</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4 ">
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <button
                                className="text-gray-900 flex items-center text-sm"
                                onClick={() => toggleDropdown('corporates')}
                            >
                                For Corporates <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                            {activeDropdown === 'corporates' && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-10">
                                    <ul>
                                        <li className="p-1 hover:bg-gray-100">Option 1</li>
                                        <li className="p-1 hover:bg-gray-100">Option 2</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* For Providers */}
                        <div className="relative">
                            <button
                                className="text-gray-900 flex items-center text-sm"
                                onClick={() => toggleDropdown('providers')} 
                            >
                                For Providers <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                            {activeDropdown === 'providers' && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-10">
                                    <ul>
                                        <li className="p-1 hover:bg-gray-100">Provider Option 1</li>
                                        <li className="p-1 hover:bg-gray-100">Provider Option 2</li>
                                        <li className="p-1 hover:bg-gray-100">Provider Option 3</li>
                                        <li className="p-1 hover:bg-gray-100">Provider Option 4</li>
                                        <li className="p-1 hover:bg-gray-100">Provider Option 5</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Security & Help */}
                        <div className="relative">
                            <button
                                className="text-gray-900 flex items-center text-sm"
                                onClick={() => toggleDropdown('security')}
                            >
                                Security & help <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                            {activeDropdown === 'security' && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-10">
                                    <ul>
                                        <li className="p-1 hover:bg-gray-100">Security Option 1</li>
                                        <li className="p-1 hover:bg-gray-100">Help Option 2</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    {
                        isAuthenticated? <button className=" bg-red-600 px-2 py-1.5 rounded-md hover:bg-red-100  border text-xs  text-white">
                        Logout
                    </button> : 
                     <Link to='/auth'><button className=" bg-slate-50 px-2 py-1.5 rounded-md hover:bg-slate-100  border text-xs text-slate-600">
                     Login / Signup
                 </button></Link>
                    }

                   
                </div>
            </div>
        </header>
    )
}

export default Navbar