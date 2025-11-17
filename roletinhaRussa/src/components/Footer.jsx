import React from 'react';

const Footer = () => {
  return (
    <div className="bg-black bg-opacity-50 border-t-2 border-yellow-600 py-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 text-sm">
          Made by UDESC students: <strong className="text-yellow-400">Carlos Ritzmann, Kauan Werlich and Paulo Gonçalves</strong>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Projeto Educativo - Disciplina de Otimização e Inferência Estatística
        </p>
        <p className="text-red-400 text-xs mt-1 font-semibold">
          ⚠️ Este é um projeto educativo. Jogos de azar podem causar dependência.
        </p>
      </div>
    </div>
  );
};

export default Footer;