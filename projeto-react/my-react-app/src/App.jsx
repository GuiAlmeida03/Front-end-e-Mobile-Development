// src/App.jsx

// 1. Importe o componente que você quer testar
import MensagemLogin from './components/MensagemLogin';

// 2. Comente os imports dos componentes anteriores
// import CicloDeVida from './components/CicloDeVida';

function App() {
  return (
    <div>
      {/* 3. Renderize o componente em teste */}
      <MensagemLogin />
    </div>
  );
}

export default App;