import React from 'react';
import { FaUser, FaFolderOpen, FaBlog, FaEnvelope } from 'react-icons/fa';

interface NavTabProps {
  onTabChange?: (tab: string) => void;
}

const NavTab: React.FC<NavTabProps> = ({ onTabChange }) => {
  return (
    <nav className="flex justify-around gap-4 items-center px-4 py-1 bg-black rounded-[15px] ring-1 ring-white">
      <div className="relative group hover:cursor-pointer hover:bg-slate-800 p-2 rounded-full transition-all duration-500" onClick={() => onTabChange?.('about')}>
        <FaUser size={20} color="white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          About
        </div>
      </div>
      <div className="relative group hover:cursor-pointer hover:bg-slate-800 p-2 rounded-full transition-all duration-500" onClick={() => onTabChange?.('project')}>
        <FaFolderOpen size={20} color="white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          Project
        </div>
      </div>
      <div className="relative group hover:cursor-pointer hover:bg-slate-800 p-2 rounded-full transition-all duration-500" onClick={() => onTabChange?.('blog')}>
        <FaBlog size={20} color="white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          Blog
        </div>
      </div>
      <div className="relative group hover:cursor-pointer hover:bg-slate-800 p-2 rounded-full transition-all duration-500" onClick={() => onTabChange?.('contact')}>
        <FaEnvelope size={20} color="white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          Contact
        </div>
      </div>
    </nav>
  );
}

export default NavTab;
