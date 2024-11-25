import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Usuário não logado. Acesso à rota protegida barrado.');
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;