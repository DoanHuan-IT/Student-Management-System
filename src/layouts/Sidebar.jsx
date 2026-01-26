import React from "react";
import { MdSpaceDashboard, MdClass, MdAdminPanelSettings } from "react-icons/md";
import { HiMiniUsers, HiUserGroup } from "react-icons/hi2";
import { BiLogOut, BiUserCircle } from "react-icons/bi";
import {NavLink} from "react-router-dom";
import Logo from "../assets/sms-logo.png";


const SidebarItem = ({to, icon: Icon, label}) => ( // eslint-disable-line no-unused-vars
    <NavLink
        to={to}
        className={({isActive}) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`
        }
    >
        <Icon size={20} />
        <span>{label}</span>
    </NavLink>
)

const Sidebar = ({user, handleLogout}) => {
    const role = user?.role || "";

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-10">
            <div className="h-20 flex items-center px-8 border-b border-gray-100">
                {/* <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Demo Project</h1> */}
                <img src={Logo} alt="logo"></img>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {(role === 'admin') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
                        <SidebarItem to="/dashboard" icon={MdSpaceDashboard} label="Dashboard" />
                        <SidebarItem to="/admins" icon={MdAdminPanelSettings} label="Admins"/>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Management</p>
                        <SidebarItem to="/teachers" icon={HiUserGroup} label="Teachers" />
                        <SidebarItem to="/students" icon={HiMiniUsers} label="Students" />
                    </>
                )}

                {/* {(role === 'admin' || role === 'teacher') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Management</p>
                        
                        {role === 'admin' && (
                            <SidebarItem to="/teachers" icon={HiUserGroup} label="Teachers" />
                        )}

                        <SidebarItem to="/teacher-profile" icon={BiUserCircle} label="My Profile" />
                        <SidebarItem to="/students" icon={HiMiniUsers} label="Students" />
                    </>
                )} */}

                {(role === 'teacher') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Management</p>
                        <SidebarItem to="/teacher-profile" icon={BiUserCircle} label="My Profile" />
                        <SidebarItem to="/students" icon={HiMiniUsers} label="Students" />
                    </>
                )}

                {(role === 'student') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Learning</p>
                        <SidebarItem to="/student-profile" icon={BiUserCircle} label="My Profile" />
                        <SidebarItem to="/my-class" icon={MdClass} label="My Class" />
                    </>
                )}
            </div>

            <div className="p-4 mt-auto border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 px-4 py-3 rounded-xl transition-colors font-medium"
                >
                    <BiLogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar