// src/components/ListaComIds.jsx

function ListaComIds() {
  const usuarios = [
    { id: 1, nome: 'Héte', skill: 'React' },
    { id: 2, nome: 'Luci', skill: 'Java' },
    { id: 3, nome: 'Guilherme', skill: 'Python' },
  ];

  return (
    <div>
      <h2>Renderizando Listas com Keys</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nome} - Especialidade: {usuario.skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaComIds;