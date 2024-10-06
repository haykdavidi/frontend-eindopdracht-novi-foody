import { useUser } from "../context/MainContext.jsx";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
    const { authenticated, isLoadingAuth } = useUser();

    if (isLoadingAuth) {
        return <div className="spinner"></div>
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
