import React, {useState, useEffect, useContext} from "react";
import {AppContext} from '~/context/AppContext';
import {getUsersAPI} from "~/services/userService";

const TeacherList = () => {
    const {user} = useContext(AppContext);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const allUsers = await getUsersAPI();
                if (user?.role === 'Admin') {
                    const listTeachers = allUsers.filter(u => u.role === 'Teacher');
                    setTeachers(listTeachers);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError('The list could not be loaded. Please try again!')
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user])

    if (!user) return <div className="text-center p-5 font-bold">Checking user permission...</div>

    if (loading) return <div className="text-center p-5 font-bold">Loading data...</div>

    if (error) return <div className="text-center p-5 text-red-500">Error: {error}</div>

    if (!loading && teachers.length === 0) {
        return <div className="text-center p-10 text-gray-500 font-bold">There are no teachers on the list.</div>
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="p-4 border-b">Teacher ID</th>
                        <th className="p-4 border-b">Username</th>
                        <th className="p-4 border-b">Password</th>
                        <th className="p-4 border-b">Full Name</th>
                        <th className="p-4 border-b">Teacher Code</th>
                        <th className="p-4 border-b">Gender</th>
                        <th className="p-4 border-b">Phone</th>
                        <th className="p-4 border-b">Address</th>
                        <th className="p-4 border-b">Class Management</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50 border-b last:border-0">
                            <td className="p-4 font-bold text-blue-600">{teacher.id}</td>
                            <td className="p-4 font-bold text-gray-700">{teacher.username}</td>
                            <td className="p-4 font-bold text-gray-700">{teacher.password}</td>
                            <td className="p-4 font-bold">{teacher.profile?.fullName}</td>
                            <td className="p-4 font-bold">{teacher.profile?.teacherCode}</td>
                            <td className="p-4 font-bold">{teacher.profile?.gender}</td>
                            <td className="p-4 font-bold">{teacher.profile?.phone}</td>
                            <td className="p-4 font-bold">{teacher.profile?.address}</td>
                            <td className="p-4 font-bold">{teacher.profile?.classManagement}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TeacherList;