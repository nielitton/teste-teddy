import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';

    if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para o login
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza o componente
    return <>{element}</>;
};

export default PrivateRoute;
