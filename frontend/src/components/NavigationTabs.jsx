import React from 'react';
import { RotateCw, BarChart3, Info, Award } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'game', icon: <RotateCw className="w-4 h-4" />, label: 'Jogo' },
    { id: 'stats', icon: <BarChart3 className="w-4 h-4" />, label: 'Estatísticas' },
    { id: 'theory', icon: <Info className="w-4 h-4" />, label: 'Teoria' },
    { id: 'leaderboard', icon: <Award className="w-4 h-4" />, label: 'Ranking' }
  ];

  return (
    <div className="bg-black bg-opacity-30 border-b border-yellow-600">
      <div className="max-w-7xl mx-auto flex gap-2 p-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold transition ${
              activeTab === tab.id 
                ? 'bg-red-700 text-white border-t-2 border-x-2 border-yellow-500' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;