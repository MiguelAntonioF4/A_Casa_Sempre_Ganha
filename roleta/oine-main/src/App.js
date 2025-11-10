import React from 'react';
import RouletteWheel from './RouletteWheel';

function App() {
  return (
    <div className="App">
      <h1 className="header-text"> A Casa Sempre Ganha</h1>
      <RouletteWheel />
      <div className="footer">
        <h3> Made by UDESC students: Carlos Ritzmann, Kauan Werlich and Paulo Gonçalves</h3>
      </div>
    </div>
  );
}

export default App;
