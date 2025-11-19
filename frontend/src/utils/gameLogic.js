// Lógica do jogo e verificação de vitórias

export const checkWin = (betType, betNumber, resultNumber) => {
  if (betType === 'number' && resultNumber.num === betNumber.toString()) {
    return true;
  }
  
  if (betType === 'red' && resultNumber.color === 'red') {
    return true;
  }
  
  if (betType === 'black' && resultNumber.color === 'black') {
    return true;
  }
  
  const numValue = parseInt(resultNumber.num);
  
  if (resultNumber.num !== '0' && resultNumber.num !== '00') {
    if (betType === 'even' && numValue % 2 === 0) {
      return true;
    }
    
    if (betType === 'odd' && numValue % 2 === 1) {
      return true;
    }
    
    if (betType === 'low' && numValue <= 18) {
      return true;
    }
    
    if (betType === 'high' && numValue >= 19) {
      return true;
    }
  }
  
  return false;
};

export const calculatePayout = (betType, betAmount) => {
  const payouts = {
    number: 36,
    red: 2,
    black: 2,
    even: 2,
    odd: 2,
    low: 2,
    high: 2
  };
  
  return betAmount * (payouts[betType] || 2);
};

export const getResultEmoji = (color) => {
  switch(color) {
    case 'red': return '🔴';
    case 'black': return '⚫';
    case 'green': return '🟢';
    default: return '';
  }
};

export const spinRoulette = (currentRotation) => {
  const spins = 5 + Math.random() * 3;
  const randomIndex = Math.floor(Math.random() * 38); // 38 números na roleta americana
  const finalRotation = currentRotation + (360 * spins) + (randomIndex * (360 / 38));
  
  return { finalRotation, randomIndex };
};