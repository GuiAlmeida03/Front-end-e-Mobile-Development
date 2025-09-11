// src/App.jsx

// 1. Importe o componente que você quer testar
import CicloDeVida from './components/CicloDeVida';

// 2. Comente os imports dos componentes anteriores
// import UsuarioInfo from './components/UsuarioInfo';

function App() {
  return (
    <div>
      {/* 3. Renderize o componente em teste */}
      <CicloDeVida />
    </div>
  );
}

export default App;