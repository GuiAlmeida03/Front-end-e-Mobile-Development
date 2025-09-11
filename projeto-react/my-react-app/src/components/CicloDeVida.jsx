// src/components/CicloDeVida.jsx
import { useState, useEffect } from 'react';

function CicloDeVida() {
  const [mensagem, setMensagem] = useState('Componente ainda não montou.');

  // useEffect para quando o componente monta
  useEffect(() => {
    console.log('Componente montou!');
    setMensagem('Componente montado com sucesso!');

    // Função de limpeza que executa quando o componente desmonta
    return () => {
      console.log('Componente desmontou! Limpando...');
    };
  }, []); // Array de dependências vazio para executar apenas uma vez

  return (
    <div>
      <h2>Ciclo de Vida com useEffect</h2>
      <p>{mensagem}</p>
    </div>
  );
}

export default CicloDeVida;