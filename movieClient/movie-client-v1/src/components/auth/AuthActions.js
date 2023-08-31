import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";


export const useAuth = () => {return useContext(AuthContext)}

export const requireAuth = () => {
    const location = useLocation();

    return (
        IsLoggedIn()
            ? <Outlet />
            : <Navigate to="/Login" state={{ from: location }} replace />
    );
}

export const isLoggedIn = () => {
    const { auth } = useAuth();
    return !!Object.keys(auth).length;
}
