import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// logic: if no user is found in context, put them back to login page.
const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;