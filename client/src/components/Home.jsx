import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Nagpur"
              className="w-2/3 border rounded-md py-2 px-4 pl-10 "
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="flex-[2] relative">
            <input
              type="text"
              placeholder="Search doctors, clinics, hospitals, etc."
              className="w-full border rounded-md py-2 px-4 pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="container  mx-auto px-4 py-8">
        <div className="flex justify-center gap-6">
          {[
            {
              title: "Instant Video Consultation",
              description: "Connect within 60 secs",
              image: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png",
              bgColor: "bg-blue-100",
            },
            {
              title: "Find Doctors Near You",
              description: "Confirmed appointments",
              image: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png",
              bgColor: "bg-teal-100",
            },
            {
              title: "Surgeries",
              description: "Safe and trusted surgery centers",
              image: "	https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png",
              bgColor: "bg-purple-100",
            },
          ].map((service, index) => (
            <div key={index} className={`${service.bgColor} rounded-2xl shadow-2xl flex flex-col items-center text-center `}>
              <img src={service.image} alt={service.title} className=" rounded-lg w-[210px] h-[220px]" />
              <div className='bg-white rounded-b-2xl flex-1 flex flex-col justify-center p-1 '>
              <h3 className="text-xl font-semibold  mb-1">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consult Doctors Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Consult top doctors online for any health concern</h2>
          <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
            View All Specialities
          </button>
        </div>
        <p className="text-gray-600 mb-8">Private online consultations with verified doctors in all specialists</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
            { name: "Period doubts or Pregnancy", icon: "🧬" , amount : 299 },
            { name: "Acne, pimple or skin issues", icon: "🦷" , amount : 399 },
            { name: "Performance issues in bed", icon: "⚤" , amount : 499 },
            { name: "Cold, cough or fever", icon: "🤧" , amount : 599 },
            { name: "Child not feeling well", icon: "👶" , amount : 699 },
            { name: "Depression or anxiety", icon: "🧠" , amount : 799 },
          ].map((specialty, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <span className="text-4xl">{specialty.icon}</span>
              </div>
              <h4 className="text-sm font-medium mb-2">{specialty.name}</h4>
              <Link to={`/consult/${specialty.amount}`} className="text-blue-600 text-sm font-medium">CONSULT NOW<span className='text-red-700 block'>₹{specialty.amount}</span></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}