import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton'; // Um componente para tela de loading

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Enquanto verificamos se o usuário está logado, mostramos uma tela de carregamento
    return (
      <div className="p-8">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Se não estiver logado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se estiver logado, mostra a página solicitada (Dashboard, Clientes, etc.)
  return <Outlet />;
};