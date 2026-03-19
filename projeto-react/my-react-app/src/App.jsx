import { useState, useEffect } from 'react'
import './App.css'

// Banco de dados mockado de usuários
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
  // 1. ADICIONADO CAMPO ALTURA AQUI
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    peso: '',
    altura: '', 
    pressaoSistolica: '',
    pressaoDiastolica: ''
  })

  const [savedData, setSavedData] = useState([])

  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  })
  const [erroLogin, setErroLogin] = useState('')

  const [modalLaudo, setModalLaudo] = useState(false)
  const [laudoAtual, setLaudoAtual] = useState(null)

  useEffect(() => {
    const sessaoSalva = localStorage.getItem('sessaoCardioLife')
    if (sessaoSalva) {
      const dadosSessao = JSON.parse(sessaoSalva)
      setUsuarioLogado(dadosSessao)
    }
  }, [])

  useEffect(() => {
    if (usuarioLogado) {
      if (usuarioLogado.id === 3) {
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
      
      const chaveUsuario = `dadosCardiologicos_${dadosUsuario.id}`
      const dadosSalvosUsuario = localStorage.getItem(chaveUsuario)
      if (dadosSalvosUsuario) {
        setSavedData(JSON.parse(dadosSalvosUsuario))
      } else {
        setSavedData([])
      }
      
      setLoginData({ email: '', senha: '' })
    } else {
      setErroLogin('Email ou senha incorretos')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sessaoCardioLife')
    setUsuarioLogado(null)
    setSavedData([])
    alert('Logout realizado com sucesso!')
  }

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
    if (erroLogin) setErroLogin('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const classificarPressao = (sistolica, diastolica) => {
    const sis = parseInt(sistolica)
    const dia = parseInt(diastolica)

    if (sis >= 180 || dia >= 110) {
      return {
        nivel: 'Hipertensão Estágio 3',
        gravidade: 'muito-critico',
        cor: '#8B0000',
        alerta: 'EMERGÊNCIA HIPERTENSIVA',
        descricao: 'Pressão arterial em níveis perigosos que requerem atenção médica IMEDIATA.',
        recomendacoes: [
          '🚨 Procure atendimento de emergency IMEDIATAMENTE',
          '🏥 Vá ao pronto-socorro ou chame SAMU (192)',
          '⚠️ Risco de AVC, infarto e danos aos órgãos',
          '💊 NÃO tome medicação por conta própria',
          '🛑 Mantenha-se em repouso até o atendimento'
        ]
      }
    }

    if ((sis >= 160 && sis <= 179) || (dia >= 100 && dia <= 109)) {
      return {
        nivel: 'Hipertensão Estágio 2',
        gravidade: 'critico',
        cor: '#DC143C',
        alerta: 'SITUAÇÃO CRÍTICA',
        descricao: 'Pressão arterial muito elevada. Necessita tratamento médico urgente.',
        recomendacoes: [
          '🏥 Busque atendimento médico nas próximas 24 horas',
          '💊 Consulte seu cardiologista sobre ajuste de medicação',
          '📊 Monitore a pressão a cada 2-3 horas',
          '🧘 Mantenha repouso e evite esforços físicos',
          '🚫 Evite sal, bebidas alcoólicas e cafeína',
          '💧 Mantenha-se hidratado com água'
        ]
      }
    }

    if ((sis >= 140 && sis <= 159) || (dia >= 90 && dia <= 99)) {
      return {
        nivel: 'Hipertensão Estágio 1',
        gravidade: 'alerta',
        cor: '#FF8C00',
        alerta: 'ATENÇÃO NECESSÁRIA',
        descricao: 'Pressão arterial elevada. Requer acompanhamento médico.',
        recomendacoes: [
          '👨‍⚕️ Agende consulta com cardiologista em até 7 dias',
          '📈 Monitore a pressão diariamente',
          '🥗 Inicie dieta com redução de sal (< 5g/dia)',
          '🏃 Pratique atividade física leve (caminhada 30min/dia)',
          '😌 Controle o estresse com técnicas de relaxamento',
          '⚖️ Controle o peso corporal'
        ]
      }
    }

    if ((sis >= 130 && sis <= 139) || (dia >= 85 && dia <= 89)) {
      return {
        nivel: 'Pressão Limítrofe',
        gravidade: 'atencao',
        cor: '#FFD700',
        alerta: 'FIQUE ATENTO',
        descricao: 'Pressão no limite superior. Mudanças no estilo de vida são recomendadas.',
        recomendacoes: [
          '📋 Faça check-up preventivo nos próximos 30 dias',
          '🥦 Adote alimentação saudável rica em frutas e vegetais',
          '🧂 Reduza consumo de sal e alimentos processados',
          '💪 Inicie programa de exercícios regulares',
          '🚭 Evite tabagismo e bebidas alcoólicas em excesso',
          '😴 Durma pelo menos 7-8 horas por noite'
        ]
      }
    }

    if ((sis >= 120 && sis <= 129) || (dia >= 80 && dia <= 84)) {
      return {
        nivel: 'Pressão Normal',
        gravidade: 'normal',
        cor: '#32CD32',
        alerta: 'PRESSÃO CONTROLADA',
        descricao: 'Sua pressão está dentro dos parâmetros normais. Continue assim!',
        recomendacoes: [
          '✅ Mantenha seus hábitos saudáveis atuais',
          '🏃 Continue praticando atividades físicas regulares',
          '🥗 Mantenha alimentação balanceada',
          '📊 Monitore a pressão mensalmente',
          '💧 Mantenha boa hidratação diária',
          '😊 Continue cuidando da sua saúde mental'
        ]
      }
    }

    if (sis < 120 && dia < 80) {
      return {
        nivel: 'Pressão Ótima',
        gravidade: 'otima',
        cor: '#228B22',
        alerta: 'PARABÉNS!',
        descricao: 'Sua pressão arterial está em níveis ótimos. Excelente saúde cardiovascular!',
        recomendacoes: [
          '🎉 Continue com seus excelentes hábitos de vida',
          '💪 Mantenha rotina de exercícios físicos',
          '🥗 Continue com alimentação saudável',
          '📊 Aferições de rotina a cada 6 meses são suficientes',
          '😊 Você está no caminho certo para longevidade',
          '🌟 Sirva de exemplo para amigos e familiares'
        ]
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 2. VALIDAÇÃO ATUALIZADA PARA INCLUIR ALTURA
    if (!formData.nome || !formData.idade || !formData.peso || !formData.altura ||
        !formData.pressaoSistolica || !formData.pressaoDiastolica) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    if (isNaN(formData.idade) || isNaN(formData.peso) || isNaN(formData.altura) ||
        isNaN(formData.pressaoSistolica) || isNaN(formData.pressaoDiastolica)) {
      alert('Idade, peso, altura e pressão devem ser números válidos!')
      return
    }

    // 3. CÁLCULO DO IMC
    const pesoNum = parseFloat(formData.peso);
    const alturaNum = parseFloat(formData.altura);
    const imcCalculado = (pesoNum / (alturaNum * alturaNum)).toFixed(2);

    const novoRegistro = {
      ...formData,
      imc: imcCalculado,
      id: Date.now(),
      dataRegistro: new Date().toLocaleString('pt-BR'),
      usuarioId: usuarioLogado.id,
      usuarioNome: usuarioLogado.nome
    }

    const dadosAtualizados = [...savedData, novoRegistro]
    const chaveUsuario = `dadosCardiologicos_${usuarioLogado.id}`
    localStorage.setItem(chaveUsuario, JSON.stringify(dadosAtualizados))
    setSavedData(dadosAtualizados)

    const laudo = classificarPressao(formData.pressaoSistolica, formData.pressaoDiastolica)
    
    // 4. INSERINDO O IMC NO LAUDO DO MODAL
    setLaudoAtual({
      ...laudo,
      paciente: formData.nome,
      pressao: `${formData.pressaoSistolica}/${formData.pressaoDiastolica}`,
      imc: imcCalculado,
      data: new Date().toLocaleString('pt-BR')
    })
    setModalLaudo(true)

    // LIMPEZA ATUALIZADA
    setFormData({
      nome: '',
      idade: '',
      peso: '',
      altura: '',
      pressaoSistolica: '',
      pressaoDiastolica: ''
    })
  }

  return (
    <div className="app">
      <header className="header">
        <h1>CardioLife</h1>
        <p>Sistema de Monitoramento Cardiológico</p>
      </header>

      {!usuarioLogado ? (
        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <div className="login-icon">🔐</div>
              <h2>Acesso ao Sistema</h2>
              <p>Entre com suas credenciais</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              {erroLogin && (
                <div className="error-message">
                  ⚠️ {erroLogin}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={loginData.senha}
                  onChange={handleLoginInputChange}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="login-btn">
                Entrar no Sistema
              </button>
            </form>

            <div className="login-info">
              <p><strong>👨‍⚕️ Usuários de teste:</strong></p>
              <p>📧 joao@cardiolife.com / 🔑 123456</p>
              <p>📧 maria@cardiolife.com / 🔑 123456</p>
              <p>📧 admin@cardiolife.com / 🔑 admin123</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="user-info">
            <div className="user-details">
              <span className="user-icon">👤</span>
              <div>
                <strong>{usuarioLogado.nome}</strong>
                <span className="user-type"> • {usuarioLogado.tipo}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Sair
            </button>
          </div>

          <main className="main-content">
            <div className="form-container">
              <h2>Cadastro de Dados Cardiológicos</h2>
              
              <form onSubmit={handleSubmit} className="medical-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome Completo:</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="idade">Idade:</label>
                    <input
                      type="number"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleInputChange}
                      placeholder="Anos"
                      min="1"
                      max="120"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="peso">Peso (kg):</label>
                    <input
                      type="number"
                      id="peso"
                      name="peso"
                      value={formData.peso}
                      onChange={handleInputChange}
                      placeholder="Ex: 70.5"
                      step="0.1"
                      min="1"
                      max="300"
                      required
                    />
                  </div>
                  
                  {/* 5. NOVO INPUT DE ALTURA AQUI NO HTML */}
                  <div className="form-group">
                    <label htmlFor="altura">Altura (m):</label>
                    <input
                      type="number"
                      id="altura"
                      name="altura"
                      value={formData.altura}
                      onChange={handleInputChange}
                      placeholder="Ex: 1.75"
                      step="0.01"
                      min="0.5"
                      max="3.0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group pressure-group">
                  <label>Pressão Arterial (mmHg):</label>
                  <div className="pressure-inputs">
                    <div className="pressure-field">
                      <label htmlFor="pressaoSistolica">Sistólica:</label>
                      <input
                        type="number"
                        id="pressaoSistolica"
                        name="pressaoSistolica"
                        value={formData.pressaoSistolica}
                        onChange={handleInputChange}
                        placeholder="120"
                        min="60"
                        max="250"
                        required
                      />
                    </div>
                    <span className="pressure-separator">/</span>
                    <div className="pressure-field">
                      <label htmlFor="pressaoDiastolica">Diastólica:</label>
                      <input
                        type="number"
                        id="pressaoDiastolica"
                        name="pressaoDiastolica"
                        value={formData.pressaoDiastolica}
                        onChange={handleInputChange}
                        placeholder="80"
                        min="40"
                        max="150"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Salvar Dados Cardiológicos
                </button>
              </form>
            </div>

            {savedData.length > 0 ? (
              <div className="data-container">
                <h3>Registros Salvos ({savedData.length})</h3>
                <div className="records-list">
                  {savedData.slice(-3).reverse().map((registro) => (
                    <div key={registro.id} className="record-card">
                      {usuarioLogado.id === 3 && registro.usuarioNome && (
                        <span className="medico-badge">👨‍⚕️ {registro.usuarioNome}</span>
                      )}
                      <h4>{registro.nome}</h4>
                      <p><strong>Idade:</strong> {registro.idade} anos</p>
                      <p><strong>Peso/Altura:</strong> {registro.peso} kg / {registro.altura} m</p>
                      <p><strong>Pressão:</strong> {registro.pressaoSistolica}/{registro.pressaoDiastolica} mmHg</p>
                      <p className="record-date">{registro.dataRegistro}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="data-container empty-state">
                <div className="empty-icon">🩺</div>
                <h3>Nenhum Registro Encontrado</h3>
                <p>Você ainda não possui aferições de pressão arterial registradas.</p>
              </div>
            )}
          </main>
        </>
      )}

      {modalLaudo && laudoAtual && (
        <div className="modal-overlay" onClick={() => setModalLaudo(false)}>
          <div className="modal-laudo" onClick={(e) => e.stopPropagation()}>
            <div 
              className="modal-header"
              style={{ backgroundColor: laudoAtual.cor }}
            >
              <h2>📋 LAUDO MÉDICO AUTOMÁTICO</h2>
              <button 
                className="modal-close"
                onClick={() => setModalLaudo(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="laudo-info">
                <p><strong>Paciente:</strong> {laudoAtual.paciente}</p>
                <p><strong>Pressão Arterial:</strong> {laudoAtual.pressao} mmHg</p>
                {/* 6. EXIBINDO O IMC CALCULADO NO MODAL */}
                <p><strong>IMC:</strong> {laudoAtual.imc} kg/m²</p>
                <p><strong>Data/Hora:</strong> {laudoAtual.data}</p>
                <p><strong>Médico:</strong> {usuarioLogado.nome}</p>
              </div>

              <div 
                className={`laudo-classificacao ${laudoAtual.gravidade}`}
                style={{ borderLeftColor: laudoAtual.cor }}
              >
                <h3>{laudoAtual.alerta}</h3>
                <h4>{laudoAtual.nivel}</h4>
                <p>{laudoAtual.descricao}</p>
              </div>

              <div className="laudo-recomendacoes">
                <h4>📌 RECOMENDAÇÕES MÉDICAS:</h4>
                <ul>
                  {laudoAtual.recomendacoes.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="laudo-aviso">
                <p>
                  ⚠️ <strong>Aviso Importante:</strong> Este laudo é gerado automaticamente 
                  com base nas diretrizes da Sociedade Brasileira de Cardiologia. 
                  Consulte sempre um médico para avaliação completa e personalizada.
                </p>
              </div>

              <button 
                className="btn-fechar-laudo"
                onClick={() => setModalLaudo(false)}
              >
                Fechar Laudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App