// Arquivo: src/components/RouletteWheel.jsx

import React from 'react';
import rouletteImage from '../assets/images/roleta.png'; 

const RouletteWheel = ({ rotation, result, message, spinning }) => { 
    
    const currentRotation = rotation; 
    const isSpinning = spinning; 
    const lastResult = result;

    return (
        <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] mx-auto my-6">
            
            {/* 🎯 CORREÇÃO 1: Posição da seta ajustada para que a ponta fique para baixo */}
            <div className="absolute top-0 transform -translate-x-1/2 z-20"> 
                <div className="indicator static-indicator"></div>
            </div>

            {/* Contêiner da Imagem da Roleta que Gira */}
            <div
                className="wheel-image-container w-full h-full rounded-full overflow-hidden"
                style={{
                    transform: `rotate(${currentRotation}deg)`,
                    transition: isSpinning ? 'transform 4s cubic-bezier(0.2, 0.8, 0.6, 1)' : 'none',
                    backgroundColor: 'transparent'
                }}
            >
                <img 
                    src={rouletteImage} 
                    alt="Roulette Wheel" 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            {/* Exibe o último resultado no centro da roleta (Visível apenas após parar) */}
            {lastResult && !isSpinning && (
                <div 
                    className={`absolute inset-0 flex items-center justify-center text-4xl font-bold rounded-full pointer-events-none 
                    ${lastResult.color === 'green' ? 'bg-green-600' : lastResult.color === 'black' ? 'bg-black' : 'bg-red-600'}
                    bg-opacity-80 z-10
                    `}
                >
                    {lastResult.num}
                </div>
            )}
            
            {/* ❌ REMOVIDO: O bloco {isSpinning && (...)} que criava o overlay cinza de giro */}
        </div>
    );
};

export default RouletteWheel;