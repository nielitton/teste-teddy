import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

function Routers() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute element={<Login />} />
                }
            />

            <Route
                path="/"
                element={
                    <PrivateRoute element={<div>Home</div>} />
                }
            />
        </Routes>
    );
}

export default Routers;
