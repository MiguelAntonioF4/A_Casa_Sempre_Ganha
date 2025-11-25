import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se tem usuário salvo ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('casino_token');
      const savedUser = localStorage.getItem('casino_user');

      if (token && savedUser) {
        try {
          // Verificar se token ainda é válido
          const response = await authAPI.getMe();
          setUser(response.user);
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          localStorage.removeItem('casino_token');
          localStorage.removeItem('casino_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      // Salvar token e usuário
      localStorage.setItem('casino_token', response.token);
      localStorage.setItem('casino_user', JSON.stringify(response.user));
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      // Salvar token e usuário
      localStorage.setItem('casino_token', response.token);
      localStorage.setItem('casino_user', JSON.stringify(response.user));
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erro ao criar conta' 
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('casino_token');
    localStorage.removeItem('casino_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};