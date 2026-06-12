import { useState, useEffect } from 'react'

export default function PetForm({ pet, onSave, onClose }) {
  const [form, setForm] = useState({
    nome: '',
    especie: 'cachorro',
    raca: '',
    idade: '',
    sexo: 'macho',
    porte: 'médio',
    descricao: '',
    vacinado: false,
    castrado: false,
    status: 'disponível',
    foto: ''
  })

  useEffect(() => {
    if (pet) {
      setForm({ ...form, ...pet })
    }
  }, [pet])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await onSave(form)
  }

  return (
    <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{pet ? 'Editar Pet' : 'Cadastrar Pet'}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nome *</label>
                  <input className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Espécie</label>
                  <select className="form-select" name="especie" value={form.especie} onChange={handleChange}>
                    <option value="cachorro">Cachorro</option>
                    <option value="gato">Gato</option>
                    <option value="coelho">Coelho</option>
                    <option value="pássaro">Pássaro</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Raça</label>
                  <input className="form-control" name="raca" value={form.raca} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Idade (anos) *</label>
                  <input className="form-control" type="number" name="idade" min="0" value={form.idade} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Sexo</label>
                  <select className="form-select" name="sexo" value={form.sexo} onChange={handleChange}>
                    <option value="macho">Macho</option>
                    <option value="fêmea">Fêmea</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Porte</label>
                  <select className="form-select" name="porte" value={form.porte} onChange={handleChange}>
                    <option value="pequeno">Pequeno</option>
                    <option value="médio">Médio</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                    <option value="disponível">Disponível</option>
                    <option value="em processo">Em Processo</option>
                    <option value="adotado">Adotado</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">URL da Foto</label>
                  <input className="form-control" name="foto" value={form.foto} onChange={handleChange} placeholder="https://..." />
                </div>

                <div className="col-12">
                  <label className="form-label">Descrição</label>
                  <textarea className="form-control" name="descricao" value={form.descricao} onChange={handleChange} rows={3} />
                </div>

                <div className="col-12">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="vacinado" id="vacinado" checked={form.vacinado} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="vacinado">Vacinado</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="castrado" id="castrado" checked={form.castrado} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="castrado">Castrado</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary">
                {pet ? 'Salvar' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
