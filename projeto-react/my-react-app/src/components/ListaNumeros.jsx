import { useState } from 'react';

function ListaNumeros() {
  const [numeros, setNumeros] = useState([1, 2, 3, 4, 5]);

  const adicionarNumero = () => {
    const novoNumero = Math.max(...numeros, 0) + 1;
    setNumeros([...numeros, novoNumero]);
  };

  const removerNumero = () => {
    setNumeros(numeros.slice(0, -1));
  };

  return (
    <div>
      <h2>Estado com Array (Adicionar/Remover)</h2>
      <ul>
        {numeros.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <button onClick={adicionarNumero}>Adicionar Número</button>
      <button onClick={removerNumero}>Remover Último Número</button>
    </div>
  );
}

export default ListaNumeros;