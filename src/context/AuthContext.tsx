import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '@/lib/api'; // Nosso "mensageiro" da API
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Este efeito roda quando o app carrega, para verificar se já existe um token salvo
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Se achou um token, vamos verificar no backend se ele é válido
      api.get('/auth/profile').then(response => {
        setUser(response.data);
      }).catch(() => {
        // Se o token for inválido, limpa tudo
        localStorage.removeItem('authToken');
        setUser(null);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    // Recarrega a página para o AuthContext rodar novamente e verificar o token
    window.location.href = '/';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};