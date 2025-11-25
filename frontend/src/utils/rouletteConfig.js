// Configurações e constantes da roleta

export const INITIAL_BALANCE = 1000;
export const MIN_BET = 5;
export const HOUSE_EDGE = 5.26;

// Números da roleta americana (0, 00, 1-36)
export const rouletteNumbers = [
  { num: '0', color: 'green' },
  { num: '00', color: 'green' },
  ...Array.from({ length: 36 }, (_, i) => ({
    num: (i + 1).toString(),
    color: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(i + 1) ? 'red' : 'black'
  }))
];

// Tipos de apostas disponíveis
export const betTypes = [
  { value: 'red', label: '🔴 Vermelho (1:1)', payout: 2 },
  { value: 'black', label: '⚫ Preto (1:1)', payout: 2 },
  { value: 'even', label: '📊 Par (1:1)', payout: 2 },
  { value: 'odd', label: '📊 Ímpar (1:1)', payout: 2 },
  { value: 'low', label: '⬇️ Baixo 1-18 (1:1)', payout: 2 },
  { value: 'high', label: '⬆️ Alto 19-36 (1:1)', payout: 2 },
  { value: 'number', label: '🎯 Número Específico (35:1)', payout: 36 }
];

// Tipos de apostas para modo automático
export const autoBetTypes = [
  { value: 'red', label: '🔴 Vermelho' },
  { value: 'black', label: '⚫ Preto' },
  { value: 'even', label: '📊 Par' },
  { value: 'odd', label: '📊 Ímpar' }
];