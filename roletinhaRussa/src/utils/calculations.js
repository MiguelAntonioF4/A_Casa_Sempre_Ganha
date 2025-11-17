// Cálculos matemáticos e estatísticos

export const calculateWinRate = (wins, totalRounds) => {
  return totalRounds > 0 ? ((wins / totalRounds) * 100).toFixed(1) : 0;
};

export const calculateExpectedLoss = (totalRounds, betAmount, houseEdge) => {
  return (totalRounds * betAmount * (houseEdge / 100)).toFixed(2);
};

export const calculateActualLoss = (initialBalance, currentBalance) => {
  return initialBalance - currentBalance;
};

export const formatCurrency = (value) => {
  return `$${Math.abs(value).toFixed(2)}`;
};

export const getRuinProbability = (playerBalance) => {
  return playerBalance > 0 ? '~100%' : '100%';
};