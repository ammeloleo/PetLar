export default function PetModal({ pet, onClose, onEdit, onDelete, onStatusChange }) {
  function getEmoji(especie) {
    if (especie === 'cachorro') return '🐕'
    if (especie === 'gato') return '🐈'
    if (especie === 'coelho') return '🐇'
    if (especie === 'pássaro') return '🐦'
    return '🐾'
  }

  const data = new Date(pet.createdAt).toLocaleDateString('pt-BR')

  return (
    <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{pet.nome}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="text-center mb-3">
              {pet.foto ? (
                <img src={pet.foto} alt={pet.nome} className="img-fluid rounded" style={{ maxHeight: 200 }} />
              ) : (
                <div style={{ fontSize: '5rem' }}>{getEmoji(pet.especie)}</div>
              )}
            </div>

            <table className="table table-sm">
              <tbody>
                <tr>
                  <th>Espécie</th>
                  <td>{pet.especie}</td>
                </tr>
                <tr>
                  <th>Raça</th>
                  <td>{pet.raca}</td>
                </tr>
                <tr>
                  <th>Idade</th>
                  <td>{pet.idade === 0 ? 'Filhote' : `${pet.idade} anos`}</td>
                </tr>
                <tr>
                  <th>Sexo</th>
                  <td>{pet.sexo}</td>
                </tr>
                <tr>
                  <th>Porte</th>
                  <td>{pet.porte}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{pet.status}</td>
                </tr>
                <tr>
                  <th>Vacinado</th>
                  <td>{pet.vacinado ? 'Sim' : 'Não'}</td>
                </tr>
                <tr>
                  <th>Castrado</th>
                  <td>{pet.castrado ? 'Sim' : 'Não'}</td>
                </tr>
              </tbody>
            </table>

            {pet.descricao && (
              <div>
                <strong>Descrição:</strong>
                <p>{pet.descricao}</p>
              </div>
            )}

            <p className="text-muted small">Cadastrado em: {data}</p>

            <div className="mb-2">
              <label className="form-label">Alterar status:</label>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-success"
                  disabled={pet.status === 'disponível'}
                  onClick={() => onStatusChange('disponível')}
                >
                  Disponível
                </button>
                <button
                  className="btn btn-sm btn-outline-warning"
                  disabled={pet.status === 'em processo'}
                  onClick={() => onStatusChange('em processo')}
                >
                  Em Processo
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  disabled={pet.status === 'adotado'}
                  onClick={() => onStatusChange('adotado')}
                >
                  Adotado
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onEdit}>Editar</button>
            <button className="btn btn-danger" onClick={onDelete}>Excluir</button>
            <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
