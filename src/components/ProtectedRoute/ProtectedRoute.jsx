import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function ProtectedRoute ({isAuthenticated, allowedRoles, userRole}) {
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace={{from: location}} />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        if (!userRole || !allowedRoles.includes(userRole)) {
            return <Navigate to="/forbidden" replace />
        }
    }
    
    return <Outlet />;
};