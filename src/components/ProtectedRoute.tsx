import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * Componente para proteger rotas e gerenciar redirecionamentos baseados na autenticação
 * @param children - Componentes filhos a serem renderizados
 * @param redirectTo - Rota para redirecionamento (padrão: '/dashboard' se autenticado, '/' se não autenticado)
 * @param requireAuth - Se true, requer autenticação; se false, redireciona usuários autenticados
 */
export function ProtectedRoute({ 
  children, 
  redirectTo, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Aguarda o carregamento da autenticação

    if (requireAuth && !user) {
      // Rota protegida: usuário não autenticado deve ir para home
      navigate(redirectTo || '/');
    } else if (!requireAuth && user) {
      // Rota pública: usuário autenticado deve ir para dashboard
      navigate(redirectTo || '/dashboard');
    }
  }, [user, loading, navigate, redirectTo, requireAuth]);

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Renderiza o conteúdo se as condições forem atendidas
  if (requireAuth && user) {
    return <>{children}</>;
  }
  
  if (!requireAuth && !user) {
    return <>{children}</>;
  }

  // Retorna null durante o redirecionamento
  return null;
}
