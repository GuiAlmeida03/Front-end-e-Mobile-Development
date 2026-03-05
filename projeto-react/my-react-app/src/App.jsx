import { useState, useEffect } from 'react'
import './App.css'

// Array mockado simulando um banco de dados de usuários
const usuariosMock = [
  {
    id: 1,
    nome: 'Dr. João Silva',
    email: 'joao@cardiolife.com',
    senha: '123456',
    tipo: 'médico'
  },
  {
    id: 2,
    nome: 'Dra. Maria Santos',
    email: 'maria@cardiolife.com',
    senha: '123456',
    tipo: 'médica'
  },
  {
    id: 3,
    nome: 'Admin Sistema',
    email: 'admin@cardiolife.com',
    senha: 'admin123',
    tipo: 'administrador'
  }
]

function App() {
  // === ESTADOS DE AUTENTICAÇÃO ===
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [loginData, setLoginData] = useState({ email: '', senha: '' })
  const [erroLogin, setErroLogin] = useState('')

  // === ESTADOS DO SISTEMA CARDIOLÓGICO ===
  const [formData, setFormData] = useState({
    nome: '', idade: '', peso: '', pressaoSistolica: '', pressaoDiastolica: ''
  })
  const [savedData, setSavedData] = useState([])

  // === EFEITO: CARREGAR SESSÃO E DADOS SALVOS ===
  useEffect(() => {
    // Restaura a sessão do usuário
    const sessaoSalva = localStorage.getItem('sessaoCardioLife')
    if (sessaoSalva) {
      const dadosSessao = JSON.parse(sessaoSalva)
      setUsuarioLogado(dadosSessao)
    }

    // Restaura os dados dos pacientes
    const dadosSalvos = localStorage.getItem('dadosCardiologicos')
    if (dadosSalvos) {
      setSavedData(JSON.parse(dadosSalvos))
    }
  }, [])

  // === LÓGICA DE LOGIN E LOGOUT ===
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
    if (erroLogin) setErroLogin('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setErroLogin('')

    if (!loginData.email || !loginData.senha) {
      setErroLogin('Por favor, preencha todos os campos')
      return
    }

    const usuarioEncontrado = usuariosMock.find(
      usuario => usuario.email === loginData.email && usuario.senha === loginData.senha
    )

    if (usuarioEncontrado) {
      const dadosUsuario = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        tipo: usuarioEncontrado.tipo
      }
      localStorage.setItem('sessaoCardioLife', JSON.stringify(dadosUsuario))
      setUsuarioLogado(dadosUsuario)
      setLoginData({ email: '', senha: '' })
    } else {
      setErroLogin('Email ou senha incorretos')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sessaoCardioLife')
    setUsuarioLogado(null)
    alert('Logout realizado com sucesso!')
  }

  // === LÓGICA DO FORMULÁRIO CARDIOLÓGICO ===
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nome || !formData.idade || !formData.peso || !formData.pressaoSistolica || !formData.pressaoDiastolica) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    const novoRegistro = {
      ...formData,
      id: Date.now(),
      dataRegistro: new Date().toLocaleString('pt-BR')
    }

    const dadosAtualizados = [...savedData, novoRegistro]
    localStorage.setItem('dadosCardiologicos', JSON.stringify(dadosAtualizados))
    setSavedData(dadosAtualizados)
    setFormData({ nome: '', idade: '', peso: '', pressaoSistolica: '', pressaoDiastolica: '' })
    alert('Dados salvos com sucesso!')
  }

  // === RENDERIZAÇÃO DA INTERFACE ===
  return (
    <div className="container">
      <header className="header">
        <h1>CardioLife</h1>
        <p>Sistema de Monitoramento Cardiológico</p>
      </header>

      {/* RENDERIZAÇÃO CONDICIONAL: Tela de Login OU Sistema */}
      {!usuarioLogado ? (
        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <h2>Acesso ao Sistema</h2>
              <p>Entre com suas credenciais</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              {erroLogin && (
                <div className="error-message">
                  {erroLogin}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" value={loginData.email} onChange={handleLoginInputChange} placeholder="Ex: admin@cardiolife.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" value={loginData.senha} onChange={handleLoginInputChange} placeholder="Sua senha" />
              </div>
              
              <button type="submit" className="login-btn">
                Entrar no Sistema
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Barra de usuário logado */}
          <div className="user-info">
            <div className="user-details">
              <div>
                <strong>{usuarioLogado.nome}</strong>
                <span className="user-type"> | {usuarioLogado.tipo}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Sair
            </button>
          </div>

          {/* Sistema Cardiológico (O que já tínhamos antes) */}
          <main className="main-content">
            <section className="form-section">
              <form onSubmit={handleSubmit} className="cardio-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome do Paciente</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Ex: João da Silva" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="idade">Idade</label>
                    <input type="number" id="idade" name="idade" value={formData.idade} onChange={handleInputChange} placeholder="Ex: 45" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="peso">Peso (kg)</label>
                    <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleInputChange} placeholder="Ex: 75.5" step="0.1" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pressaoSistolica">Pressão Sistólica (Máx)</label>
                    <input type="number" id="pressaoSistolica" name="pressaoSistolica" value={formData.pressaoSistolica} onChange={handleInputChange} placeholder="Ex: 12" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pressaoDiastolica">Pressão Diastólica (Mín)</label>
                    <input type="number" id="pressaoDiastolica" name="pressaoDiastolica" value={formData.pressaoDiastolica} onChange={handleInputChange} placeholder="Ex: 8" />
                  </div>
                </div>

                <button type="submit" className="submit-btn">Salvar Dados</button>
              </form>
            </section>

            <section className="records-section">
              <h2>Últimos Registros</h2>
              {savedData.length === 0 ? (
                <p className="no-data">Nenhum registro encontrado.</p>
              ) : (
                <div className="cards-container">
                  {savedData.slice().reverse().slice(0, 3).map(registro => (
                    <div key={registro.id} className="record-card">
                      <h3>{registro.nome}</h3>
                      <div className="card-details">
                        <p><strong>Idade:</strong> {registro.idade} anos</p>
                        <p><strong>Peso:</strong> {registro.peso} kg</p>
                        <p><strong>Pressão:</strong> {registro.pressaoSistolica}/{registro.pressaoDiastolica} mmHg</p>
                        <p className="registro-data"><small>Data: {registro.dataRegistro}</small></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </>
      )}
    </div>
  )
}

export default App