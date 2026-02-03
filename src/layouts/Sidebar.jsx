import React from "react";
import {
    MdSpaceDashboard,
    MdClass,
    MdAdminPanelSettings,
    MdSettings,
    MdCalendarMonth,
    MdAnnouncement,
    MdLabelImportant
} from "react-icons/md";

import {
    HiMiniUsers,
    HiUserGroup,
    HiCheckBadge
} from "react-icons/hi2";

import { BiLogOut,
    BiUserCircle,
    BiSolidReport
} from "react-icons/bi";

import {
    ImBook
} from "react-icons/im";

import { GiAchievement } from "react-icons/gi";
import {NavLink} from "react-router-dom";
import Logo from "~/assets/images/logos/studentmanagementsystem-removebg-preview.png";


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

const getProfilePath = ({user}) => {
    switch (user?.role) {
        case 'Admin': return "/admin-profile";
        case 'Teacher': return "/teacher-profile";
        case 'Student': return "/student-profile";
        default: return "/login";
    }
}

const getSettingPath = ({user}) => {
    switch (user?.role) {
        case "Admin": return "/admin-setting";
        case "Teacher": return "/teacher-setting";
        case "Student": return "/student-setting";
        default: return "/login";
    }
}

const Sidebar = ({user, handleLogout}) => {
    const role = user?.role || "";
    const profilePath = getProfilePath({user});
    const settingPath = getSettingPath({user});

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-10">
            <div className="h-30 flex items-center px-8 border-b border-gray-100">
                <img src={Logo} alt="logo"></img>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {(role === 'Admin') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
                        <SidebarItem to="/admin-dashboard" icon={MdSpaceDashboard} label="Dashboard" />
                        <SidebarItem to="/admins" icon={MdAdminPanelSettings} label="Admins"/>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Management</p>
                        <SidebarItem to="/teachers" icon={HiUserGroup} label="Teachers" />
                        <SidebarItem to="/students" icon={HiMiniUsers} label="Students" />
                        <SidebarItem to="/subjects" icon={ImBook} label="Subjects" />
                        <SidebarItem to="/schedule" icon={MdCalendarMonth} label="Schedule" />
                        <SidebarItem to="/notices" icon={MdAnnouncement} label="Notices" />
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Account</p>
                        <SidebarItem to={profilePath} icon={BiUserCircle} label="Profile" />
                        <SidebarItem to={settingPath} icon={MdSettings} label="Setting" />
                    </>
                )}

                {(role === 'Teacher') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
                        <SidebarItem to="/teacher-dashboard" icon={MdSpaceDashboard} label="Dashboard" />
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Management</p>
                        <SidebarItem to="/my-class" icon={HiMiniUsers} label="My Class" />
                        <SidebarItem to="/schedule" icon={MdCalendarMonth} label="Schedule" />
                        <SidebarItem to="/mark" icon={GiAchievement} label="Marks" />
                        <SidebarItem to="/attendance" icon={HiCheckBadge} label="Attendance" />
                        <SidebarItem to="/assignments" icon={MdLabelImportant} label="Assignments" />
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Account</p>
                        <SidebarItem to={profilePath} icon={BiUserCircle} label="Profile" />
                        <SidebarItem to={settingPath} icon={MdSettings} label="Setting" />
                    </>
                )}

                {(role === 'Student') && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
                        <SidebarItem to="/student-dashboard" icon={MdSpaceDashboard} label="Dashboard" />
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Learning</p>
                        <SidebarItem to="/my-class" icon={MdClass} label="My Class" />
                        <SidebarItem to="/schedule" icon={MdCalendarMonth} label="Schedule" />
                        <SidebarItem to="/assignments" icon={MdLabelImportant} label="Assignments" />
                        <SidebarItem to="/grade-report" icon={BiSolidReport} label="Grade Report" />
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Account</p>
                        <SidebarItem to={profilePath} icon={BiUserCircle} label="Profile" />
                        <SidebarItem to={settingPath} icon={MdSettings} label="Setting" />
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
export default Sidebar;