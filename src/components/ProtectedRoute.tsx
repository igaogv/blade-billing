import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export const ProtectedRoute = () => {
  // CORREÇÃO: Pegamos 'isAuthenticated' e 'isLoading', em vez de 'token'
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Enquanto o contexto verifica se o usuário está logado, mostramos uma tela de carregamento
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  // A verificação agora é feita com 'isAuthenticated'
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};