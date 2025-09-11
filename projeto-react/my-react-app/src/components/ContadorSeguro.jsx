import { useState } from 'react';

function ContadorSeguro() {
  const [contador, setContador] = useState(0);

  // Forma segura que usa o valor anterior do estado para calcular o próximo
  const incrementarSeguro = () => {
    setContador(estadoAnterior => estadoAnterior + 1);
  };

  return (
    <div>
      <h2>Contador (Forma Segura)</h2>
      <p>Valor: {contador}</p>
      <button onClick={incrementarSeguro}>Incrementar</button>
    </div>
  );
}

export default ContadorSeguro;