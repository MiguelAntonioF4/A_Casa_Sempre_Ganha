import React from 'react';
import { getResultEmoji } from '../utils/gameLogic';

const RouletteWheel = ({ rotation, result, message }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-yellow-600">
      <div className="flex justify-center items-center">
        <div className="relative">
          <div 
            className="w-80 h-80 rounded-full border-8 border-yellow-500 relative overflow-hidden transition-transform duration-3000 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: 'conic-gradient(red 0deg, black 18.95deg, red 37.9deg, black 56.85deg, green 75.8deg, red 94.75deg, black 113.7deg, red 132.65deg, black 151.6deg, red 170.55deg, black 189.5deg, red 208.45deg, black 227.4deg, red 246.35deg, black 265.3deg, red 284.25deg, black 303.2deg, green 322.15deg, red 341.1deg, black 360deg)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-900 rounded-full border-4 border-yellow-500"></div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-yellow-400"></div>
          </div>
        </div>
      </div>
      
      {result && (
        <div className="mt-6 text-center">
          <div className={`inline-block px-8 py-4 rounded-lg text-4xl font-bold ${
            result.color === 'red' ? 'bg-red-600' : result.color === 'black' ? 'bg-gray-900' : 'bg-green-600'
          }`}>
            {result.num}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center text-yellow-300 font-semibold">
        {message || 'Faça sua aposta e gire a roleta!'}
      </div>
    </div>
  );
};

export default RouletteWheel;