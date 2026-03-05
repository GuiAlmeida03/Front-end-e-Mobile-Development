import { useState, useEffect } from 'react'
import './App.css'

const usuariosMock = [
  { id: 1, nome: 'Dr. João Silva', email: 'joao@cardiolife.com', senha: '123456', tipo: 'médico' },
  { id: 2, nome: 'Dra. Maria Santos', email: 'maria@cardiolife.com', senha: '123456', tipo: 'médica' },
  { id: 3, nome: 'Admin Sistema', email: 'admin@cardiolife.com', senha: 'admin123', tipo: 'administrador' }
]

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [loginData, setLoginData] = useState({ email: '', senha: '' })
  const [erroLogin, setErroLogin] = useState('')

  const [formData, setFormData] = useState({
    nome: '', idade: '', peso: '', pressaoSistolica: '', pressaoDiastolica: ''
  })
  const [savedData, setSavedData] = useState([])

  // 1º Efeito - Restaura a sessão ao carregar a página
  useEffect(() => {
    const sessaoSalva = localStorage.getItem('sessaoCardioLife')
    if (sessaoSalva) {
      setUsuarioLogado(JSON.parse(sessaoSalva))
    }
  }, [])

  // 2º Efeito - Carrega os dados específicos do usuário logado
  useEffect(() => {
    if (usuarioLogado) {
      if (usuarioLogado.id === 3) {
        // Lógica do Administrador: Busca registros de todos os médicos (IDs 1 a 3)
        const todosOsDados = []
        for (let i = 1; i <= 3; i++) {
          const chave = `dadosCardiologicos_${i}`
          const dados = localStorage.getItem(chave)
          if (dados) {
            todosOsDados.push(...JSON.parse(dados))
          }
        }
        setSavedData(todosOsDados)
      } else {
        // Lógica do Médico: Busca apenas os próprios registros
        const chaveUsuario = `dadosCardiologicos_${usuarioLogado.id}`
        const dadosSalvos = localStorage.getItem(chaveUsuario)
        if (dadosSalvos) {
          setSavedData(JSON.parse(dadosSalvos))
        } else {
          setSavedData([])
        }
      }
    }
  }, [usuarioLogado])

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
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

      // Carrega os dados imediatamente para evitar atraso visual
      if (dadosUsuario.id === 3) {
        const todosOsDados = []
        for (let i = 1; i <= 3; i++) {
          const chave = `dadosCardiologicos_${i}`
          const dados = localStorage.getItem(chave)
          if (dados) todosOsDados.push(...JSON.parse(dados))
        }
        setSavedData(todosOsDados)
      } else {
        const chaveUsuario = `dadosCardiologicos_${dadosUsuario.id}`
        const dadosSalvosUsuario = localStorage.getItem(chaveUsuario)
        setSavedData(dadosSalvosUsuario ? JSON.parse(dadosSalvosUsuario) : [])
      }
      
      setLoginData({ email: '', senha: '' })
    } else {
      setErroLogin('Email ou senha incorretos')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sessaoCardioLife')
    setUsuarioLogado(null)
    setSavedData([]) // Limpa os dados da tela ao sair
    alert('Logout realizado com sucesso!')
  }

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

    // Agora o registro salva a "assinatura" do médico que o criou
    const novoRegistro = {
      ...formData,
      id: Date.now(),
      dataRegistro: new Date().toLocaleString('pt-BR'),
      usuarioId: usuarioLogado.id,
      usuarioNome: usuarioLogado.nome
    }

    const dadosAtualizados = [...savedData, novoRegistro]
    
    // Salva na chave exclusiva do médico logado
    const chaveUsuario = `dadosCardiologicos_${usuarioLogado.id}`
    localStorage.setItem(chaveUsuario, JSON.stringify(dadosAtualizados))
    
    setSavedData(dadosAtualizados)
    setFormData({ nome: '', idade: '', peso: '', pressaoSistolica: '', pressaoDiastolica: '' })
    alert('Dados salvos com sucesso!')
  }

  return (
    <div className="container">
      <header className="header">
        <h1>CardioLife</h1>
        <p>Sistema de Monitoramento Cardiológico</p>
      </header>

      {!usuarioLogado ? (
        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <h2>Acesso ao Sistema</h2>
              <p>Entre com suas credenciais</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              {erroLogin && <div className="error-message">{erroLogin}</div>}
              
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" value={loginData.email} onChange={handleLoginInputChange} placeholder="Ex: admin@cardiolife.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" value={loginData.senha} onChange={handleLoginInputChange} placeholder="Sua senha" />
              </div>
              
              <button type="submit" className="login-btn">Entrar no Sistema</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="user-info">
            <div className="user-details">
              <div>
                <strong>{usuarioLogado.nome}</strong>
                <span className="user-type"> | {usuarioLogado.tipo}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">Sair</button>
          </div>

          <main className="main-content">
            {/* Ocultei o formulário para o Administrador, já que ele apenas audita */}
            {usuarioLogado.id !== 3 && (
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
            )}

            <section className="records-section">
              {savedData.length > 0 ? (
                <>
                  <h2>Registros Salvos ({savedData.length})</h2>
                  <div className="cards-container">
                    {savedData.slice().reverse().map(registro => (
                      <div key={registro.id} className="record-card">
                        <h3>{registro.nome}</h3>
                        <div className="card-details">
                          <p><strong>Idade:</strong> {registro.idade} anos</p>
                          <p><strong>Peso:</strong> {registro.peso} kg</p>
                          <p><strong>Pressão:</strong> {registro.pressaoSistolica}/{registro.pressaoDiastolica} mmHg</p>
                          
                          {/* Badge do médico (aparece apenas para o Admin) */}
                          {usuarioLogado.id === 3 && registro.usuarioNome && (
                            <p className="medico-badge-container">
                              <span className="medico-badge">👨‍⚕️ {registro.usuarioNome}</span>
                            </p>
                          )}
                          
                          <p className="registro-data"><small>Data: {registro.dataRegistro}</small></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-data empty-state">
                  <h3>Nenhum Registro Encontrado</h3>
                  <p>Ainda não há aferições de pressão arterial registradas.</p>
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