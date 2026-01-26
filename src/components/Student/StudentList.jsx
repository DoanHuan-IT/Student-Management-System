import React, {useEffect, useState} from "react";
import {getStudentsAPI} from "../../services/studentService";

const StudentList = ({user}) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const allStudents = await getStudentsAPI();
                if (user?.role === 'admin') {
                    setStudents(allStudents);
                } else if (user?.role === 'teacher') {
                    const myStudents = allStudents.filter(st => st.classId === user.classManagement);
                    setStudents(myStudents);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (!user) return <div className="text-center p-5 font-bold">Checking user permission...</div>

    if (loading) return <div className="text-center p-5 font-bold">Loading data...</div>;

    if (!loading && students.length === 0) {
        return <div className="text-center p-10 text-gray-500 font-bold">There are no students on the list.</div>
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                    
                        <th className="p-4 border-b">Student ID</th>
                        <th className="p-4 border-b">Username</th>
                        <th className="p-4 border-b">Password</th>
                        <th className="p-4 border-b">Full Name</th>
                        <th className="p-4 border-b">Student Code</th>
                        <th className="p-4 border-b">Phone</th>
                        <th className="p-4 border-b">Gender</th>
                        <th className="p-4 border-b">Address</th>
                        <th className="p-4 border-b">Class ID</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                    {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 border-b last:border-0">
                            <td className="p-4 font-bold text-blue-600">{student.id}</td>
                            <td className="p-4 font-bold text-gray-700">{student.username}</td>
                            <td className="p-4 font-bold text-gray-700">{student.password}</td>
                            <td className="p-4 font-bold">{student.profile?.fullName}</td>
                            <td className="p-4 font-bold">{student.profile?.studentCode}</td>
                            <td className="p-4 font-bold">{student.profile?.gender}</td>
                            <td className="p-4 font-bold">{student.profile?.phone}</td>
                            <td className="p-4 font-bold">{student.profile?.address}</td>
                            <td className="p-4 font-bold">{student.profile?.classId || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                
            </div>
        </div>
    );
};

export default StudentList;