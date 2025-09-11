// src/App.jsx

// 1. Importe o componente que você quer testar
import ListaComIds from './components/ListaComIds';

// 2. Comente os imports dos componentes anteriores
// import MensagemLogin from './components/MensagemLogin';

function App() {
  return (
    <div>
      {/* 3. Renderize o componente em teste */}
      <ListaComIds />
    </div>
  );
}

export default App;