// src/components/UsuarioInfo.jsx
import { useState } from 'react';

function UsuarioInfo() {
  const [usuario, setUsuario] = useState({
    nome: 'Guilherme',
    idade: 22,
    ativo: true,
  });

  // Função para inverter o status 'ativo' de forma segura
  const toggleAtivo = () => {
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      ativo: !prevUsuario.ativo,
    }));
  };

  return (
    <div>
      <h3>Nome: {usuario.nome}</h3>
      <p>Idade: {usuario.idade}</p>
      <p>Status: {usuario.ativo ? 'Ativo' : 'Inativo'}</p>
      <button onClick={toggleAtivo}>
        {usuario.ativo ? 'Desativar' : 'Ativar'}
      </button>
    </div>
  );
}

export default UsuarioInfo;