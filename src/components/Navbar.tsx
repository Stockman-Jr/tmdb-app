import { useState } from "react";
import { Icon } from "@iconify/react";

export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
      <nav className="w-full fixed top-0 z-50 shadow-md text-zinc-300 bg-zinc-900/70 backdrop-blur-md">
        <div className="max-w-screen flex items-center justify-between px-6 py-3">
          <div className="flex flex-col py-2 text-zinc-300">
            <h2 className="text-left text-2xl md:text-3xl lg:text-4xl">
              FlickFinder
            </h2>
            <span className="text-sm italic md:ml-8">
              Find & discover your next watch!
            </span>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 text-zinc-300 font-bold tracking-wider">
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#">Home</a>
            </li>
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#">Movies</a>
            </li>
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#">TV-Shows</a>
            </li>
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#">About</a>
            </li>
          </ul>

          {/* Mobile toggle button */}
          <button onClick={toggleNavbar} className="md:hidden cursor-pointer">
            <Icon
              icon={
                isCollapsed
                  ? "line-md:menu-to-close-transition"
                  : "mingcute:menu-line"
              }
              width="24"
            />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`
          md:hidden overflow-hidden z-90 transition-all duration-300
          ${isCollapsed ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <ul className="px-4 pb-4 space-y-2 font-bold tracking-wider text-center">
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#" className="block py-1">
                Home
              </a>
            </li>
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#" className="block py-1">
                Movies
              </a>
            </li>
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#" className="block py-1">
                TV-Shows
              </a>
            </li>
            <li className="transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:drop-shadow-cyan-500/70">
              <a href="#" className="block py-1">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );

 }