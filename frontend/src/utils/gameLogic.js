// Arquivo: A_Casa_Sempre_Ganha/roletinhaRussa/src/utils/gameLogic.js

// Lógica do jogo e verificação de vitórias

// 🚨 IMPORTANTE: Você deve importar a ordem exata dos 38 números/segmentos (incluindo '0' e '00')
// do seu arquivo rouletteConfig.js para que o alinhamento da seta funcione.
// Como não tenho o rouletteConfig.js, estou definindo uma ordem comum para a roleta americana como exemplo.
// VERIFIQUE E AJUSTE esta lista para corresponder à ORDEM FÍSICA da sua imagem.
const WHEEL_ORDER_MAPPING = [
  '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', 
  '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2' 
];


export const checkWin = (betType, betNumber, resultNumber) => {
// ... (Restante da função checkWin mantida)
};

export const calculatePayout = (betType, betAmount) => {
// ... (Restante da função calculatePayout mantida)
};

export const getResultEmoji = (color) => {
// ... (Restante da função getResultEmoji mantida)
};

export const spinRoulette = (currentRotation) => {
  const numSegments = WHEEL_ORDER_MAPPING.length; // 38
  const segmentAngle = 360 / numSegments; // 360 / 38
  
  // Sorteia o índice do segmento vencedor (0 a 37)
  const randomIndex = Math.floor(Math.random() * numSegments); 

  // --- Lógica de Alinhamento Preciso ---
  
  // 1. Calcula o ângulo necessário para que o centro do segmento sorteado
  //    (definido por randomIndex) pare no topo (0 graus).
  //    A roleta gira no sentido horário. 
  //    O ângulo é 360 - (randomIndex * segmentAngle) 
  let angleToStop = 360 - (randomIndex * segmentAngle); 

  // 2. Adiciona um pequeno ajuste para centralizar o meio do segmento na seta.
  //    (Removemos o offset da borda do segmento e centralizamos na seta)
  angleToStop += (segmentAngle / 2); 
  
  // 3. Adiciona voltas completas (ex: 10 voltas = 3600 graus) para o efeito de giro convincente.
  const extraTurns = 10 * 360; 
  
  const finalRotation = currentRotation + extraTurns + angleToStop;
  
  return { finalRotation, randomIndex }; 
};