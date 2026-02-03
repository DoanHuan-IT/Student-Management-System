import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function ProtectedRoute ({isAuthenticated, allowedRoles, userRole}) {
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/forbidden" replace />
    }
    
    return <Outlet />;
};