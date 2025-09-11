// src/App.jsx

// 1. Importe o componente que você quer testar
import UsuarioInfo from './components/UsuarioInfo';

// 2. Comente os imports dos componentes que você já testou
// import BoasVindas from './components/BoasVindas';
// import Contador from './components/Contador';


function App() {
  return (
    <div>
      {/* 3. Renderize aqui o componente atual que está sendo testado */}
      <UsuarioInfo />
    </div>
  );
}

export default App;