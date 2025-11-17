import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthLayout from './AuthLayout';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginScreen = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpar erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações básicas
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email inválido');
      setLoading(false);
      return;
    }

    // Simular login (TEMPORÁRIO - depois vamos conectar com backend)
    setTimeout(() => {
      // Verificar se usuário existe no localStorage
      const users = JSON.parse(localStorage.getItem('casino_users') || '[]');
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        login({
          id: user.id,
          name: user.name,
          email: user.email
        });
      } else {
        setError('Email ou senha incorretos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Entrar" 
      subtitle="Faça login para continuar jogando"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Erro */}
        {error && (
          <div className="bg-red-900 bg-opacity-50 border-l-4 border-red-500 p-3 rounded flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full bg-gray-700 border border-yellow-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={loading}
            />
          </div>
        </div>

        {/* Senha */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-700 border border-yellow-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={loading}
            />
          </div>
        </div>

        {/* Esqueci a senha */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-yellow-400 hover:text-yellow-300 transition"
          >
            Esqueceu a senha?
          </button>
        </div>

        {/* Botão Login */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-3 rounded-lg transition shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Entrando...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Entrar
            </>
          )}
        </button>

        {/* Link para Cadastro */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginScreen;