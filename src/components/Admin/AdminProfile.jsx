import React, {useState, useEffect, useContext} from "react";
import {AppContext} from '~/context/AppContext';
import {updateUserProfileAPI} from "~/services/userService"

const AdminProfile = () => {
    const {user} = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user])

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'password' || name === 'username') {
            setFormData({...formData, [name]: value})
        }
        else {
            setFormData({
                ...formData,
                profile: {
                    ...formData.profile,
                    [name]: value
                }
            })
        }
    }

    const handleSave = async() => {
        const cleanData = {
            id: user.id,
            username: formData.username,
            password: formData.password,
            role: "Admin",
            profile: {
                fullName: formData.profile.fullName,
                gender: formData.profile.gender,
                phone: formData.profile.phone,
                address: formData.profile.address,
                department: formData.profile.department
            }
        };

        try {
            await updateUserProfileAPI(user.id, cleanData);

            const currentUser = JSON.parse(localStorage.getItem("user"));
            const newStorage = {...cleanData, accessToken: currentUser.accessToken};
            localStorage.setItem("user", JSON.stringify(newStorage));

            alert("The information has been updated!")
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            alert("Error: ", error.message)
        }
    }

    const profile = formData.profile || {};

    return (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
                <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-50 mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-800">{user.fullName || user.firstName}</h2>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium mt-2 capitalize">
                    {user.role}
                </span>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 space-y-4">

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Admin ID:</span>
                    <span className="font-medium">{user.id || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Username:</span>
                    {isEditing ? (
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-1 rounded w-1/2 text-right"
                        />
                    ) : (
                        <span className="font-medium">{formData.username || "N/A"}</span>
                    )}
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Password:</span>
                    {isEditing ? (
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-1 rounded w-1/2 text-right"
                        />
                    ) : (
                        <span className="font-medium">{formData.password || "N/A"}</span>
                    )}
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Full Name:</span>
                    {isEditing ? (
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="border p-1 rounded w-1/2 text-right"
                        />
                    ) : (
                        <span className="font-medium">{formData.fullName || "N/A"}</span>
                    )}
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Gender:</span>
                    {isEditing ? (
                        <input
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="border p-1 rounded w-1/2 text-right"
                        />
                    ) : (
                        <span className="font-medium">{profile.gender || "N/A"}</span>
                    )}
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Phone:</span>
                    {isEditing ? (
                        <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="border p-1 rounded w-1/2 text-right"
                        />
                    ) : (
                        <span className="font-medium">{profile.phone || "N/A"}</span>
                    )}
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Address:</span>
                    {isEditing ? (
                        <input
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="border p-1 rounded w-1/2 text-right"
                        />
                    ) : (
                        <span className="font-medium">{profile.address || "N/A"}</span>
                    )}
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Depertment:</span>
                    <span className="font-medium">{profile.department || "N/A"}</span>
                </div>

                <div className="mt-4 flex gap-2">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        >
                            Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData(user); //Reset old data
                                }}
                                className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default AdminProfile;