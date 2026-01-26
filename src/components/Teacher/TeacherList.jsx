import {useState, useEffect} from "react";
import {getUsersAPI} from "../../services/userService";

const TeacherList = ({user}) => {
    const [teacher, setTeacher] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const allUsers = await getUsersAPI();
                if (user?.role === 'admin') {
                    const teachers = allUsers.filter(u => u.role === 'teacher');
                    setTeacher(teachers);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user])

    if (!user) return <div className="text-center p-5 font-bold">Checking user permission...</div>

    if (loading) return <div className="text-center p-5 font-bold">Loading data...</div>

    if (!loading && teacher.length === 0) {
        return <div className="text-center p-10 text-gray-500 font-bold">There are no teachers on the list.</div>
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="p-4 border-b">TeacherID</th>
                        <th className="p-4 border-b">Class Management</th>
                        <th className="p-4 border-b">Full Name</th>
                        <th className="p-4 border-b">Gender</th>
                        <th className="p-4 border-b">Phone</th>
                        <th className="p-4 border-b">Username</th>
                        <th className="p-4 border-b">Password</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                    {teacher.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50 border-b last:border-0">
                            <td className="p-4 font-bold text-blue-600">{teacher.teacherID}</td>
                            <td className="p-4 font-bold text-gray-700">{teacher.fullName}</td>
                            <td className="p-4 font-bold">{teacher.classManagement}</td>
                            <td className="p-4 font-bold">{teacher.gender}</td>
                            <td className="p-4 font-bold">{teacher.phone}</td>
                            <td className="p-4 font-bold">{teacher.username}</td>
                            <td className="p-4 font-bold">{teacher.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TeacherList;