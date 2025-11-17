import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthLayout from './AuthLayout';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const RegisterScreen = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return false;
    }

    if (formData.name.length < 3) {
      setError('Nome deve ter no mínimo 3 caracteres');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Email inválido');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simular cadastro (TEMPORÁRIO - depois vamos conectar com backend)
    setTimeout(() => {
      // Verificar se email já existe
      const users = JSON.parse(localStorage.getItem('casino_users') || '[]');
      
      if (users.find(u => u.email === formData.email)) {
        setError('Este email já está cadastrado');
        setLoading(false);
        return;
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // ATENÇÃO: Em produção NUNCA salvar senha em texto puro!
        createdAt: new Date().toISOString()
      };

      // Salvar usuário
      users.push(newUser);
      localStorage.setItem('casino_users', JSON.stringify(users));

      // Fazer login automático
      register({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Cadastrar" 
      subtitle="Crie sua conta para começar a jogar"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Erro */}
        {error && (
          <div className="bg-red-900 bg-opacity-50 border-l-4 border-red-500 p-3 rounded flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Nome */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="João Silva"
              className="w-full bg-gray-700 border border-yellow-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={loading}
            />
          </div>
        </div>

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
          <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
        </div>

        {/* Confirmar Senha */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Confirmar Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-700 border border-yellow-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              disabled={loading}
            />
          </div>
        </div>

        {/* Termos */}
        <div className="bg-gray-800 bg-opacity-50 p-3 rounded border-l-4 border-yellow-500">
          <p className="text-xs text-gray-300">
            Ao se cadastrar, você concorda com os termos de uso e política de privacidade. 
            Este é um projeto educativo da UDESC.
          </p>
        </div>

        {/* Botão Cadastrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Criando conta...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Criar Conta
            </>
          )}
        </button>

        {/* Link para Login */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
            >
              Faça login
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterScreen;