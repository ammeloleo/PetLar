//importando componeneste e funções

import { useState, useEffect } from 'react'
import { petService } from './services/api'
import PetCard from './components/PetCard.jsx'
import PetForm from './components/PetForm.jsx'
import PetModal from './components/PetModal.jsx'

//Estado padrão que o codigo será exibido sem as mudanças
export default function App() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [mensagem, setMensagem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [petEditando, setPetEditando] = useState(null)
  const [petSelecionado, setPetSelecionado] = useState(null)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState('')

  useEffect(() => {
    carregarPets()
  }, [busca, filtroStatus, filtroEspecie])

  async function carregarPets() {
    setLoading(true)
    try {
      const params = {}
      if (busca) params.search = busca
      if (filtroStatus) params.status = filtroStatus
      if (filtroEspecie) params.especie = filtroEspecie

      const res = await petService.getAll(params)
      setPets(res.data.data)
    } catch (erro) {
      mostrarMensagem('Erro ao carregar pets', 'danger')
    }
    setLoading(false)
  }

  function mostrarMensagem(texto, tipo = 'success') {
    setMensagem({ texto, tipo })
    setTimeout(() => setMensagem(null), 3000)
  }

  async function salvarPet(dados) {
    try {
      if (petEditando) {
        await petService.update(petEditando._id, dados)
        mostrarMensagem('Pet atualizado!')
      } else {
        await petService.create(dados)
        mostrarMensagem('Pet cadastrado!')
      }
      setShowForm(false)
      setPetEditando(null)
      carregarPets()
    } catch (erro) {
      mostrarMensagem('Erro ao salvar pet', 'danger')
    }
  }

  async function deletarPet(id, nome) {
    if (!window.confirm(`Remover ${nome}?`)) return
    try {
      await petService.remove(id)
      mostrarMensagem('Pet removido')
      setPetSelecionado(null)
      carregarPets()
    } catch (erro) {
      mostrarMensagem('Erro ao remover', 'danger')
    }
  }

  async function mudarStatus(id, novoStatus) {
    try {
      await petService.updateStatus(id, novoStatus)
      mostrarMensagem('Status atualizado!')
      carregarPets()
      if (petSelecionado && petSelecionado._id === id) {
        const res = await petService.getById(id)
        setPetSelecionado(res.data.data)
      }
    } catch (erro) {
      mostrarMensagem('Erro ao atualizar status', 'danger')
    }
  }

  function abrirEdicao(pet) {
    setPetEditando(pet)
    setShowForm(true)
    setPetSelecionado(null)
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">🐾 PetLar</span>
          <button className="btn btn-light btn-sm" onClick={() => { setPetEditando(null); setShowForm(true) }}>
            + Novo Pet
          </button>
        </div>
      </nav>

      {mensagem && (
        <div className={`alert alert-${mensagem.tipo} alert-dismissible m-3`}>
          {mensagem.texto}
          <button className="btn-close" onClick={() => setMensagem(null)}></button>
        </div>
      )}

      <div className="container mt-4">
        {/* filtros */}
        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <select className="form-select" value={filtroEspecie} onChange={e => setFiltroEspecie(e.target.value)}>
              <option value="">Todas as espécies</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="coelho">Coelho</option>
              <option value="pássaro">Pássaro</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <select className="form-select" value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
              <option value="">Todos os status</option>
              <option value="disponível">Disponível</option>
              <option value="em processo">Em Processo</option>
              <option value="adotado">Adotado</option>
            </select>
          </div>
          <div className="col-md-2 mb-2">
            <button className="btn btn-outline-secondary w-100" onClick={() => { setBusca(''); setFiltroStatus(''); setFiltroEspecie('') }}>
              Limpar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Carregando...</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Nenhum pet encontrado.</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {pets.map(pet => (
              <div className="col" key={pet._id}>
                <PetCard
                  pet={pet}
                  onClick={() => setPetSelecionado(pet)}
                  onEdit={() => abrirEdicao(pet)}
                  onDelete={() => deletarPet(pet._id, pet.nome)}
                  onStatusChange={status => mudarStatus(pet._id, status)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <PetForm
          pet={petEditando}
          onSave={salvarPet}
          onClose={() => { setShowForm(false); setPetEditando(null) }}
        />
      )}

      {petSelecionado && (
        <PetModal
          pet={petSelecionado}
          onClose={() => setPetSelecionado(null)}
          onEdit={() => abrirEdicao(petSelecionado)}
          onDelete={() => deletarPet(petSelecionado._id, petSelecionado.nome)}
          onStatusChange={status => mudarStatus(petSelecionado._id, status)}
        />
      )}
    </>
  )
}
