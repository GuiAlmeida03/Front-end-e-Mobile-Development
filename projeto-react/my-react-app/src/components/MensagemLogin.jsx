// src/components/MensagemLogin.jsx
import { useState } from 'react';

function MensagemLogin() {
  const [logado, setLogado] = useState(false);

  return (
    <div>
      <h2>Renderização Condicional</h2>
      {/* Exemplo com operador ternário */}
      <p>{logado ? 'Bem-vindo(a) de volta!' : 'Por favor, faça o login.'}</p>
      
      {/* Exemplo com curto-circuito */}
      {logado && <p>Você tem 5 novas mensagens.</p>}
      
      <button onClick={() => setLogado(!logado)}>
        {logado ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}

export default MensagemLogin;