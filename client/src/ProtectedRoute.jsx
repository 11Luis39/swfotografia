import { useAuth } from './context/Auth.Context'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ allowedRoles }) {
    const { loading, isAuthenticated, user } = useAuth();

    //const hasAccess = isAuthenticated && user && user.roles && user.roles.some(role => allowedRoles.includes(role));

    if (loading) return <h1>Loading...</h1>;
    if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
    //if (!hasAccess) return <Navigate to="/accesoDenegado" replace />; 

    return <Outlet />;
}

