// src/components/BoasVindas.jsx

// Este componente recebe 'nome' e 'curso' via props
function BoasVindas({ nome, curso }) {
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      <p>Bem-vindo(a) ao curso de {curso}.</p>
    </div>
  );
}

export default BoasVindas;