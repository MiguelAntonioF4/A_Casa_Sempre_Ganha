// Arquivo: A_Casa_Sempre_Ganha/roletinhaRussa/src/components/RouletteWheel.jsx

import React, { useMemo } from 'react';
// Remova o import desnecessário: import { useGameState } from '../hooks/useGameState';
// Remova o import desnecessário: import { numbers } from '../utils/rouletteConfig';
import rouletteImage from '../assets/images/roleta.png'; // Certifique-se que o caminho da imagem está correto!

// O componente deve receber as props 'rotation', 'result' e 'spinning' do seu pai (GameTab)
const RouletteWheel = ({ rotation, result, spinning }) => { 
    
    // O erro "Cannot destructure property 'isSpinning' of 'gameState' as it is undefined"
    // ocorria porque você estava tentando destruturar: 
    // const { gameState } = useGameState();
    // const { isSpinning, finalRotation, lastResult } = gameState;

    // Agora, usamos as props recebidas:
    const isSpinning = spinning; // Renomeia 'spinning' para 'isSpinning' (opcional, mas claro)
    const currentRotation = rotation; 
    const lastResult = result;

    // ... (restante do código que usa currentRotation, isSpinning e lastResult) ...
    // ...

    return (
        <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] mx-auto my-6">
            
            {/* Seta estática no topo */}
            <div className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="indicator static-indicator"></div>
            </div>

            {/* Imagem da Roleta que Gira */}
            <div
                className="wheel-image-container w-full h-full rounded-full overflow-hidden"
                style={{
                    transform: `rotate(${currentRotation}deg)`, // Usa currentRotation
                    transition: isSpinning ? 'transform 4s cubic-bezier(0.2, 0.8, 0.6, 1)' : 'none', // Usa isSpinning
                    backgroundColor: 'transparent'
                }}
            >
                {/* ... (restante da renderização) ... */}
            </div>
            {/* ... (restante do return) ... */}
        </div>
    );
};

export default RouletteWheel;