import React from 'react'

const Navbar = () => {
  return (
     <header className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold bg-gray-500 p-5 rounded-full">Amana Logo</div>
        <ul className="flex space-x-4">
          <li>Menu</li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
