function ListaNomes() {
  const nomes = ['Ana', 'Guilherme', 'Carlos', 'Daniel'];

  return (
    <div>
      <h2>Lista de Nomes (Key por Índice)</h2>
      <ul>
        {nomes.map((nome, index) => (
          <li key={index}>{nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaNomes;