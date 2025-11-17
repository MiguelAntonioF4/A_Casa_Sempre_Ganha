import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2">
            🎰 A Casa Sempre Ganha
          </h1>
          <p className="text-gray-400 text-sm">
            Teoria da Ruína do Jogador
          </p>
        </div>

        {/* Card de Auth */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border-2 border-yellow-500 shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mb-6">{subtitle}</p>
          )}
          
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Projeto Educativo - UDESC
          </p>
          <p className="text-red-400 text-xs mt-1">
            ⚠️ Este é um projeto educativo. Jogos de azar podem causar dependência.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;