import { useState } from 'react';

function SaudacaoUsuario(props) {
  return <h1>Bem-vindo(a) de volta, {props.nome}!</h1>;
}

function SaudacaoConvidado() {
  return <h1>Por favor, faça o login para continuar.</h1>;
}

function MensagemUsuario() {
  const [estaLogado, setEstaLogado] = useState(false);

  return (
    <div>
      <h2>Renderização com Componentes Condicionais</h2>
      {estaLogado ? <SaudacaoUsuario nome="Guilherme" /> : <SaudacaoConvidado />}
      <button onClick={() => setEstaLogado(!estaLogado)}>
        {estaLogado ? 'Sair' : 'Entrar'}
      </button>
    </div>
  );
}

export default MensagemUsuario;