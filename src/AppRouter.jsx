import {Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import JWTAuthPage from "./pages/JWTAuthPage";

//Admin import
import AdminDashboard from "./pages/AdminDashboard";
import AdminList from "./components/Admin/AdminList";
import AdminProfile from "./components/Admin/AdminProfile";

//Teacher import
import TeacherList from "./components/Teacher/TeacherList";
import TeacherProfile from "./components/Teacher/TeacherProfile";

//Student import
import StudentList from "./components/Student/StudentList";
import StudentProfile from "./components/Student/StudentProfile";

//main
import MainLayout from "./layouts/MainLayout";

//context
import { AppContext } from "./context/AppContext";
import { useContext } from "react";

const ForbiddenPage = () => <h1 className="text-center mt-10 text-red-500">403 - Forbidden!!!</h1>;

export default function AppRouter() {
    const {user, handleLogin, handleLogout} = useContext(AppContext);

    const isAuthenticated = !!user;
    const userRole = user?.role || "";

    const defaultPath = () => {
        if (userRole === 'Student') {
            return "/student-dashboard";
        } else if (userRole === 'Teacher') {
            return "/teacher-dashboard";
        }
        return "/admin-dashboard";
    }

    return (
        <Routes>
            <Route path="/login" element={!isAuthenticated ? <JWTAuthPage onLoginSuccess={handleLogin} /> : <Navigate to={defaultPath()} />} />
            
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={["Admin", "Teacher", "Student"]} />}>
                <Route element={<MainLayout user={user} handleLogout={handleLogout}/>}>

                    {userRole === 'Admin' && (
                        <>
                            <Route path="/admin-dashboard" element={<AdminDashboard />}/>
                            <Route path="/admins" element={<AdminList user={user}/>}/>
                            <Route path="/teachers" element={<TeacherList user={user}/>}/>
                            <Route path="/students" element={<StudentList user={user}/>}/>
                            <Route path="/admin-profile" element={<AdminProfile user={user}/>}/>
                            <Route path="/admin-setting" element={<div>Admin Setting</div>}/>
                        </>
                    )}

                    {(userRole === 'Teacher') && (
                        <>
                            <Route path="/teacher-dashboard" element={<div>Teacher Dashboard</div>}/>
                            <Route path="/teacher-profile" element={<TeacherProfile user={user}/>}/>
                            {/* <Route path="/students" element={<StudentList user={user}/>}/> */}
                            <Route path="/my-class" element={<div>My Class</div>}/>"
                            <Route path="/teacher-setting" element={<div>Teacher Setting</div>}/>
                        </>
                    )}

                    {userRole === 'Student' && (
                        <>
                            <Route path="/student-dashboard" element={<div>Student Dashboard</div>}/>
                            <Route path="/student-profile" element={<StudentProfile user={user}/>}/>
                            <Route path="/my-class" element={<div>My Class</div>}/>
                            <Route path="/student-setting" element={<div>Student Setting</div>}/>

                            <Route path="/dashboard" element={<Navigate to="/student-dashboard" replace />} />
                        </>
                    )}
                </Route>
            </Route>
            <Route path="*" element={<Navigate to={isAuthenticated ? defaultPath() : "/login"} />} />
        </Routes>
    );
}