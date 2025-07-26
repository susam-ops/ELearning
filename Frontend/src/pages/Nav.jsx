import React, { useState } from "react";
import Navitem from "../components/custom/Navitem";
import { Menu, X } from "lucide-react"; // hamburger icons

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-blue-100 px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-2xl font-bold">EduStream</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex h-full gap-6 text-xl items-center ">
          <div className="h-full rounded-lg hover:bg-white p-3">
            <Navitem head="Home" to="/" />
          </div>
          <div className="h-full rounded-lg hover:bg-white p-3">
            <Navitem head="Courses" to="/courses" />
          </div>
          <div className="h-full rounded-lg hover:bg-white p-3">
            <Navitem head="Features" to="/features" />
          </div>
          <div className="h-full rounded-lg hover:bg-white p-3">
            <Navitem head="Aboutus" to="/aboutus" />
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4 text-xl">
          <div className="h-full rounded-lg hover:bg-white p-3">
            <Navitem head="Login" to="/login" />
          </div>
          <div className="h-full rounded-lg hover:bg-white p-3">
            <Navitem head="Register" to="/register" />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[72px] left-0 w-full bg-blue-100 flex flex-col items-center gap-4 py-4 z-50 md:hidden shadow-lg">
            <Navitem head="Home" to="/" />
            <Navitem head="Courses" to="/courses" />
            <Navitem head="Features" to="/features" />
            <Navitem head="Aboutus" to="/aboutus" />
            <Navitem head="Login" to="/login" />
            <Navitem head="Register" to="/register" />
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;
