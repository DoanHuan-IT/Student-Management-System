import {Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import JWTAuthPage from "./pages/JWTAuthPage";

//Admin import
import AdminDashboard from "./pages/AdminDashboard";
import AdminList from "./components/Admin/AdminList";

//Teacher import
import TeacherList from "./components/Teacher/TeacherList";
import TeacherProfile from "./components/Teacher/TeacherProfile";

//Student import
import StudentList from "./components/Student/StudentList";
import StudentProfile from "./components/Student/StudentProfile";

//main
import MainLayout from "./layouts/MainLayout";
import MyProfile from "./components/Student/StudentProfile";

const ForbiddenPage = () => <h1 className="text-center mt-10 text-red-500">403 - Forbidden!!!</h1>;

export default function AppRouter({user, handleLogin, handleLogout}) {
    const isAuthenticated = !!user;
    const userRole = user?.role || "";

    const defaultPatch = () => {
        if (userRole === 'student') {
            return "/student-dashboard";
        }
        return "/dashboard";
    }

    return (
        <Routes>
            <Route path="/login" element={!isAuthenticated ? <JWTAuthPage onLoginSuccess={handleLogin} /> : <Navigate to={defaultPatch()} />} />
            
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={["admin", "teacher", "student"]} />}>
                <Route element={<MainLayout user={user} handleLogout={handleLogout}/>}>
                    {/* Admin */}
                    {userRole === 'admin' && (
                        <>
                            <Route path="/dashboard" element={<AdminDashboard />}/>
                            <Route path="/admins" element={<AdminList user={user}/>}/>
                            <Route path="/teachers" element={<TeacherList user={user}/>}/>
                            <Route path="/students" element={<StudentList user={user}/>}/>
                        </>
                    )}
                    
                    {/* Admin && Teacher */}
                    {/* {(userRole === 'admin' || userRole === 'teacher') && (
                        <>
                            <Route path="/dashboard" element={<AdminDashboard />}/>
                            <Route path="/teacher-profile" element={<TeacherProfile user={user}/>}/>
                            <Route path="/students" element={<StudentList user={user}/>}/>

                        </>
                    )} */}

                    {(userRole === 'teacher') && (
                        <>
                            <Route path="/teacher-profile" element={<TeacherProfile user={user}/>}/>
                            <Route path="/students" element={<StudentList user={user}/>}/>
                        </>
                    )}

                    {/* Student */}
                    {userRole === 'student' && (
                        <>
                            <Route path="/student-dashboard" element={<div>Student Dashboard</div>}/>
                            <Route path="/student-profile" element={<StudentProfile user={user}/>}/>
                            <Route path="/my-class" element={<div>My Class</div>}/>

                            <Route path="/dashboard" element={<Navigate to="/student-dashboard" replace />} />
                        </>
                    )}
                </Route>
            </Route>
            <Route path="*" element={<Navigate to={isAuthenticated ? defaultPatch() : "/login"} />} />
        </Routes>
    );
}