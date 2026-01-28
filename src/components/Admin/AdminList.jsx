import { useEffect, useState } from "react";
import {getUsersAPI} from "~/services/userService";


const AdminList = ({user}) => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const allUsers = await getUsersAPI();
                if (user?.role === 'admin') {
                    const listAdmins = allUsers.filter(u => u.role === 'admin');
                    setAdmins(listAdmins);
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

    if (loading) return <div className="text-center p-5 font-bold">Loading data...</div>

    if (!loading && admins.length === 0) {
        return <div className="text-center p-10 text-gray-500 font-bold">There are no admins on the list.</div>
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="p-4 border-b">Admin ID</th>
                        <th className="p-4 border-b">Username</th>
                        <th className="p-4 border-b">Password</th>
                        <th className="p-4 border-b">Full Name</th>
                        <th className="p-4 border-b">Gender</th>
                        <th className="p-4 border-b">Phone</th>
                        <th className="p-4 border-b">Address</th>
                        <th className="p-4 border-b">Department</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                    {admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50 border-b last:border-0">
                            <td className="p-4 font-bold text-blue-600">{admin.id}</td>
                            <td className="p-4 font-bold text-gray-700">{admin.username}</td>
                            <td className="p-4 font-bold text-gray-700">{admin.password}</td>
                            <td className="p-4 font-bold">{admin.profile?.fullName}</td>
                            <td className="p-4 font-bold">{admin.profile?.gender}</td>
                            <td className="p-4 font-bold">{admin.profile?.phone}</td>
                            <td className="p-4 font-bold">{admin.profile?.address}</td>
                            <td className="p-4 font-bold">{admin.profile?.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminList;