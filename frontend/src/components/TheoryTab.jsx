import React from 'react';

const TheoryTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border-2 border-yellow-600">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">📚 Teoria da Ruína do Jogador</h2>
        
        <div className="space-y-6 text-gray-200">
          {/* Introdução */}
          <div className="bg-red-900 bg-opacity-30 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-red-300 mb-3">O que é a Teoria da Ruína?</h3>
            <p className="text-lg leading-relaxed">
              É um conceito matemático que prova que um jogador com <strong>capital limitado</strong>, 
              jogando repetidamente contra um adversário com <strong>capital infinito</strong> (a casa), 
              inevitavelmente ficará sem dinheiro - mesmo que o jogo seja "justo".
            </p>
          </div>

          {/* Conceitos Fundamentais */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">🎯 Conceitos Fundamentais</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg">
                <h4 className="text-xl font-bold text-blue-300 mb-2">1. Vantagem da Casa (House Edge)</h4>
                <p className="mb-3">
                  Na roleta americana, existem 38 números: 1-36, 0 e 00. Quando você aposta em vermelho/preto, 
                  existem 18 números de cada cor, mas os zeros são verdes.
                </p>
                <div className="bg-blue-900 bg-opacity-30 p-3 rounded">
                  <p className="font-mono text-sm">
                    Probabilidade de ganhar = 18/38 = 47.37%<br/>
                    Probabilidade de perder = 20/38 = 52.63%<br/>
                    <span className="text-red-400 font-bold">Vantagem da Casa = 5.26%</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg">
                <h4 className="text-xl font-bold text-green-300 mb-2">2. Valor Esperado (Expected Value)</h4>
                <p className="mb-3">
                  É quanto você espera ganhar (ou perder) em média por aposta:
                </p>
                <div className="bg-green-900 bg-opacity-30 p-3 rounded">
                  <p className="font-mono text-sm mb-2">
                    VE = (Prob. Vitória × Ganho) - (Prob. Derrota × Perda)
                  </p>
                  <p className="text-sm mb-2">Para uma aposta de $10 no vermelho:</p>
                  <p className="font-mono text-sm">
                    VE = (0.4737 × $10) - (0.5263 × $10)<br/>
                    VE = $4.737 - $5.263<br/>
                    <span className="text-red-400 font-bold">VE = -$0.526 por aposta</span>
                  </p>
                </div>
                <p className="mt-3 text-yellow-200">
                  ⚠️ Isso significa que, em média, você perde <strong>52 centavos</strong> a cada $10 apostados!
                </p>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg">
                <h4 className="text-xl font-bold text-purple-300 mb-2">3. Assimetria de Recursos</h4>
                <p className="mb-3">
                  Este é o ponto crucial da teoria:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-900 bg-opacity-30 p-4 rounded border-l-4 border-red-500">
                    <div className="text-red-300 font-bold mb-2">👤 Você (Jogador)</div>
                    <ul className="text-sm space-y-1">
                      <li>• Capital: $1.000</li>
                      <li>• Pode perder 100 apostas de $10</li>
                      <li>• <strong>Tem limite!</strong></li>
                    </ul>
                  </div>
                  <div className="bg-green-900 bg-opacity-30 p-4 rounded border-l-4 border-green-500">
                    <div className="text-green-300 font-bold mb-2">🏛️ A Casa</div>
                    <ul className="text-sm space-y-1">
                      <li>• Capital: ∞ (Infinito)</li>
                      <li>• Pode perder milhões</li>
                      <li>• <strong>Sem limite!</strong></li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-yellow-200">
                  💡 A casa aguenta MUITO mais variação de sorte. Mesmo que você ganhe temporariamente, 
                  eventualmente você bate no limite de $0 (ruína).
                </p>
              </div>
            </div>
          </div>

          {/* Fórmula da Probabilidade de Ruína */}
          <div className="bg-purple-900 bg-opacity-30 p-6 rounded-lg border-2 border-purple-500">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">📐 Fórmula da Probabilidade de Ruína</h3>
            <div className="bg-black bg-opacity-50 p-4 rounded mb-4">
              <p className="font-mono text-lg text-center">
                P(ruína) = Capital Casa / (Capital Jogador + Capital Casa)
              </p>
            </div>
            <div className="space-y-3">
              <p><strong>Para um jogo justo (50/50):</strong></p>
              <div className="bg-gray-800 p-3 rounded">
                <p className="font-mono text-sm">
                  Jogador: $1.000 | Casa: $10.000<br/>
                  P(ruína) = 10.000 / (1.000 + 10.000) = 10.000 / 11.000<br/>
                  <span className="text-red-400 font-bold">P(ruína) ≈ 90.9%</span>
                </p>
              </div>
              <p className="text-yellow-300 font-bold mt-4">
                ⚠️ Se a casa tem capital INFINITO: P(ruína) = 100%
              </p>
              <p className="text-red-300 text-lg font-bold">
                O jogador SEMPRE quebra. É matematicamente certo!
              </p>
            </div>
          </div>

          {/* Por que isso acontece */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">🤔 Por que isso acontece?</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg">
                <h4 className="text-xl font-bold text-orange-300 mb-2">Random Walk (Caminho Aleatório)</h4>
                <p className="mb-3">
                  Imagine seu saldo como alguém andando aleatoriamente:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Cada aposta <strong className="text-green-400">ganha</strong> = 1 passo para frente</li>
                  <li>• Cada aposta <strong className="text-red-400">perdida</strong> = 1 passo para trás</li>
                  <li>• Você tem uma <strong className="text-red-400">barreira inferior</strong> em $0 (ruína)</li>
                  <li>• A casa tem barreira tão alta que é praticamente infinita</li>
                </ul>
                <p className="mt-3 text-yellow-200">
                  Resultado: Você eventualmente bate na barreira de $0.
                </p>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg">
                <h4 className="text-xl font-bold text-blue-300 mb-2">Lei dos Grandes Números</h4>
                <p className="mb-3">
                  Quanto mais rodadas você joga, mais o resultado se aproxima da probabilidade teórica:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-900 bg-opacity-30 p-3 rounded">
                    <div className="font-bold text-green-300 mb-2">📊 Curto Prazo (10-100 rodadas)</div>
                    <p className="text-sm">Sorte pode fazer você ganhar temporariamente</p>
                  </div>
                  <div className="bg-red-900 bg-opacity-30 p-3 rounded">
                    <div className="font-bold text-red-300 mb-2">📉 Longo Prazo (1000+ rodadas)</div>
                    <p className="text-sm">A matemática prevalece - você perde</p>
                  </div>
                </div>
                <p className="mt-3">
                  Após 1.000 rodadas com vantagem da casa de 5.26%:
                </p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Expectativa: ~474 vitórias vs ~526 derrotas</li>
                  <li>• Perda esperada: ~$526</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conclusão */}
          <div className="bg-red-900 bg-opacity-50 p-6 rounded-lg border-2 border-red-500">
            <h3 className="text-2xl font-bold text-red-300 mb-4">🎯 Conclusão</h3>
            <div className="space-y-3 text-lg">
              <p>✅ Capital limitado vs capital infinito = <strong>derrota inevitável</strong></p>
              <p>✅ Mesmo em jogos "justos" (50/50), se você tem menos recursos, <strong>você perde</strong></p>
              <p>✅ Com vantagem da casa (52.63% vs 47.37%), a derrota é <strong>ainda mais rápida</strong></p>
              <p>✅ Quanto mais rodadas, <strong>mais certa a ruína</strong></p>
              <p className="text-yellow-300 font-bold text-xl mt-4">
                💡 A única estratégia vencedora é NÃO JOGAR!
              </p>
            </div>
          </div>

          {/* Referências */}
          <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg">
            <h4 className="text-lg font-bold text-gray-300 mb-3">📖 Referências</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li>• Feller, W. (1968). "An Introduction to Probability Theory and Its Applications"</li>
              <li>• Thorp, E. O. (1966). "Beat the Dealer"</li>
              <li>• Dubins, L. E., & Savage, L. J. (1965). "How to Gamble If You Must"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryTab;