import React from "react";

const TeacherProfile = ({user}) => {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
            <div className="flex flex-col items-center">
                <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-50 mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-800">{user.fullName || user.firstName}</h2>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mt-2 capitalize">
                    {user.role}
                </span>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Teacher ID</span>
                    <span className="font-medium">{user.teacherID || "---"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Class Management:</span>
                    <span className="font-medium">{user.classManagement || "---"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Gender:</span>
                    <span className="font-medium">{user.gender || "---"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">{user.phone || "---"}</span>
                </div>
            </div>
        </div>
    )
}
export default TeacherProfile;