import React, { createContext, useState, useContext, useEffect } from 'react';

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

  // Verificar se tem usuário salvo no localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('casino_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('casino_user');
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('casino_user', JSON.stringify(userData));
  };

  // Register
  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('casino_user', JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
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