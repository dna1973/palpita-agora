// Hook simplificado para CRUD de bolões
// Versão inicial com dados mockados para desenvolvimento

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

// Tipos simplificados para o CRUD de bolões
export interface CreatePoolData {
  name: string;
  description?: string;
  max_participants?: number;
  prize_amount?: number;
  start_date?: string;
  end_date?: string;
  scoring_rules?: {
    exact_score: number;
    correct_winner: number;
    correct_draw: number;
  };
}

export interface UpdatePoolData extends Partial<CreatePoolData> {
  id: string;
  status?: string;
}

// Tipo simplificado para pool com dados essenciais
export interface PoolData {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  status: string;
  max_participants?: number;
  prize_amount?: number;
  invite_code: string;
  scoring_rules?: any;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  participant_count?: number;
}

// Dados mockados para desenvolvimento inicial
const mockPools: PoolData[] = [
  {
    id: '1',
    name: 'Copa do Mundo 2024',
    description: 'Bolão oficial da Copa do Mundo',
    creator_id: 'user1',
    status: 'active',
    max_participants: 30,
    prize_amount: 500,
    invite_code: 'COPA2024',
    scoring_rules: { exact_score: 3, correct_winner: 1, correct_draw: 1 },
    start_date: '2024-06-01',
    end_date: '2024-07-15',
    created_at: '2024-05-01T10:00:00Z',
    updated_at: '2024-05-01T10:00:00Z',
    participant_count: 24,
  },
  {
    id: '2',
    name: 'Brasileirão 2024',
    description: 'Campeonato Brasileiro Série A',
    creator_id: 'user1',
    status: 'open',
    max_participants: 20,
    prize_amount: 300,
    invite_code: 'BRASIL24',
    scoring_rules: { exact_score: 3, correct_winner: 1, correct_draw: 1 },
    start_date: '2024-04-01',
    end_date: '2024-12-01',
    created_at: '2024-03-15T10:00:00Z',
    updated_at: '2024-03-15T10:00:00Z',
    participant_count: 12,
  },
];

export function usePools() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pools, setPools] = useState<PoolData[]>(mockPools);
  const [isLoading, setIsLoading] = useState(false);

  // Simular busca de bolões do usuário
  const userPools = pools.filter(pool => pool.creator_id === user?.id || true); // Mostrar todos por enquanto
  const publicPools = pools.filter(pool => pool.status === 'open');

  // Criar novo bolão
  const createPool = async (poolData: CreatePoolData) => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPool: PoolData = {
      id: Date.now().toString(),
      ...poolData,
      creator_id: user.id,
      status: 'draft',
      invite_code: Math.random().toString(36).substr(2, 8).toUpperCase(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      participant_count: 1,
      scoring_rules: poolData.scoring_rules || {
        exact_score: 3,
        correct_winner: 1,
        correct_draw: 1
      }
    };
    
    setPools(prev => [newPool, ...prev]);
    setIsLoading(false);
    
    toast({
      title: "Bolão criado com sucesso!",
      description: `O bolão "${newPool.name}" foi criado. Código de convite: ${newPool.invite_code}`,
    });
  };

  // Atualizar bolão
  const updatePool = async ({ id, ...updateData }: UpdatePoolData) => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPools(prev => prev.map(pool => 
      pool.id === id && pool.creator_id === user.id
        ? { ...pool, ...updateData, updated_at: new Date().toISOString() }
        : pool
    ));
    
    setIsLoading(false);
    
    const updatedPool = pools.find(p => p.id === id);
    toast({
      title: "Bolão atualizado!",
      description: `O bolão "${updatedPool?.name}" foi atualizado com sucesso.`,
    });
  };

  // Deletar bolão
  const deletePool = async (poolId: string) => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const poolToDelete = pools.find(p => p.id === poolId);
    
    if (poolToDelete?.creator_id !== user.id) {
      toast({
        title: "Erro ao excluir bolão",
        description: "Apenas o criador pode excluir o bolão",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (poolToDelete?.status !== 'draft') {
      toast({
        title: "Erro ao excluir bolão",
        description: "Apenas bolões em rascunho podem ser excluídos",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    setPools(prev => prev.filter(pool => pool.id !== poolId));
    setIsLoading(false);
    
    toast({
      title: "Bolão excluído!",
      description: "O bolão foi excluído com sucesso.",
    });
  };

  // Participar de um bolão (por código de convite)
  const joinPool = async (inviteCode: string) => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pool = pools.find(p => p.invite_code === inviteCode.toUpperCase());
    
    if (!pool) {
      toast({
        title: "Erro ao entrar no bolão",
        description: "Código de convite inválido",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (pool.status !== 'open' && pool.status !== 'draft') {
      toast({
        title: "Erro ao entrar no bolão",
        description: "Este bolão não está mais aceitando participantes",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simular verificação se já participa (sempre permitir por enquanto)
    
    setIsLoading(false);
    
    toast({
      title: "Entrou no bolão!",
      description: `Você agora participa do bolão "${pool.name}".`,
    });
  };

  return {
    // Dados
    userPools,
    publicPools,
    
    // Estados de loading
    isLoadingUserPools: isLoading,
    isLoadingPublicPools: isLoading,
    
    // Erros
    userPoolsError: null,
    publicPoolsError: null,
    
    // Mutations
    createPool,
    updatePool,
    deletePool,
    joinPool,
    
    // Estados das mutations
    isCreatingPool: isLoading,
    isUpdatingPool: isLoading,
    isDeletingPool: isLoading,
    isJoiningPool: isLoading,
  };
}
