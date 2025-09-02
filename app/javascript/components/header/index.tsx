import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const showBackButton = location.pathname !== '/'

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md rounded-b-lg">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <FaArrowLeft className="text-xl" />
              <span className="hidden md:inline">Voltar</span>
            </button>
          )}

          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaHome className="text-xl" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>
        <h1 className="text-xl font-bold">Organization Chart</h1>
      </div>
    </header>
  )
}

export default Header
