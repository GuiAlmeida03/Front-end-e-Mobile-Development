import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. Estado para os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    peso: '',
    pressaoSistolica: '',
    pressaoDiastolica: ''
  })
  
  // 2. Estado para armazenar os registros salvos
  const [savedData, setSavedData] = useState([])

  // 3. Carregar dados do LocalStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('dadosCardiologicos')
    if (dadosSalvos) {
      setSavedData(JSON.parse(dadosSalvos))
    }
  }, [])

  // 4. Atualizar o estado conforme o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 5. Salvar os dados ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validação simples para não salvar vazio
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
    
    // Salva no navegador e atualiza a tela
    localStorage.setItem('dadosCardiologicos', JSON.stringify(dadosAtualizados))
    setSavedData(dadosAtualizados)

    // Limpa o formulário
    setFormData({
      nome: '',
      idade: '',
      peso: '',
      pressaoSistolica: '',
      pressaoDiastolica: ''
    })

    alert('Dados salvos com sucesso!')
  }

  return (
    <div className="container">
      <header className="header">
        <h1>CardioLife</h1>
        <p>Cadastro de Dados Cardiológicos</p>
      </header>

      <main>
        {/* Formulário de Cadastro */}
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

        {/* Listagem dos Últimos Registros */}
        <section className="records-section">
          <h2>Últimos Registros</h2>
          
          {savedData.length === 0 ? (
            <p className="no-data">Nenhum registro encontrado.</p>
          ) : (
            <div className="cards-container">
              {/* Pega os últimos 3 registros salvos (revertendo a ordem) */}
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
    </div>
  )
}

export default App