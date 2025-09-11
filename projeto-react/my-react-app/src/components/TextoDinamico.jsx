import { useState, useEffect } from 'react';

function TextoDinamico() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSegundos(s => s + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Demonstração do Virtual DOM</h2>
      <p>Este texto é estático e não muda.</p>
      <p>
        Contador de segundos (atualizado pelo React): <strong>{segundos}</strong>
      </p>
    </div>
  );
}

export default TextoDinamico;