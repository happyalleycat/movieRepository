import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../actions/Action";


export const RequireAuth = () => {
    const location = useLocation();

    return (
        IsLoggedIn()
            ? <Outlet />
            : <Navigate to="/Login" state={{ from: location }} replace />
    );
}

export const IsLoggedIn = () => {
    const { auth } = useAuth();
    return !!Object.keys(auth).length;
}
