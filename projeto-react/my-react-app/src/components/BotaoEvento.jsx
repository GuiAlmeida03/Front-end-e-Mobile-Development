import { useState } from 'react';

function BotaoEvento() {
  const [textoInput, setTextoInput] = useState('');

  const handleClick = () => {
    alert('Você clicou no botão (onClick)!');
  };

  const handleChange = (event) => {
    setTextoInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Formulário enviado com o texto: ${textoInput}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Demonstração de Eventos</h2>
      <input 
        type="text" 
        value={textoInput} 
        onChange={handleChange} 
        placeholder="Digite algo aqui"
      />
      <button type="button" onClick={handleClick}>
        Botão de Clique
      </button>
      <button type="submit">
        Enviar Formulário
      </button>
      <p>Texto atual: {textoInput}</p>
    </form>
  );
}

export default BotaoEvento;