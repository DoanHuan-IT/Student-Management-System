import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";

const Header = ({ title, user }) => {
    return (
        <header className="h-30 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">

        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        <div className="flex items-center gap-6">
        
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 w-64">
                <IoMdSearch size={18} className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder-gray-400"
                />
            </div>

            <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition">
                <FaBell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-700">{user.profile?.fullName}</p>
                    <p className="text-xs text-gray-400">{user?.role}</p>
                </div>
                    <img
                        src={user?.avatar ? user.avatar : "https://i.pravatar.cc/150?img=12"} 
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                </div>

            </div>
        </header>
    );
};

export default Header;