export default function PetCard({ pet, onClick, onEdit, onDelete, onStatusChange }) {
  function getEmoji(especie) {
    if (especie === 'cachorro') return '🐕'
    if (especie === 'gato') return '🐈'
    if (especie === 'coelho') return '🐇'
    if (especie === 'pássaro') return '🐦'
    return '🐾'
  }

  function getCorStatus(status) {
    if (status === 'disponível') return 'successo'
    if (status === 'em processo') return 'aguarde'
    return 'secondary'
  }

  return (
    <div className="card h-100" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{ height: 160 }}>
        {pet.foto ? (
          <img src={pet.foto} alt={pet.nome} className="w-100 h-100" style={{ objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '3.5rem' }}>{getEmoji(pet.especie)}</span>
        )}
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-0">{pet.nome}</h5>
          <span className={`badge bg-${getCorStatus(pet.status)}`}>{pet.status}</span>
        </div>
        <p className="text-muted small mb-2">{pet.raca}</p>
        <p className="mb-1 small">
          {pet.idade === 0 ? 'Filhote' : `${pet.idade} anos`} • {pet.sexo} • {pet.porte}
        </p>
        {pet.vacinado && <span className="badge bg-success me-1">Vacinado</span>}
        {pet.castrado && <span className="badge bg-info">Castrado</span>}
      </div>

      <div className="card-footer" onClick={e => e.stopPropagation()}>
        <div className="d-flex gap-2">
          {pet.status === 'disponível' && (
            <button className="btn btn-sm btn-success" onClick={() => onStatusChange('em processo')}>
              Adotar
            </button>
          )}
          {pet.status === 'em processo' && (
            <button className="btn btn-sm btn-secondary" onClick={() => onStatusChange('adotado')}>
              Confirmar
            </button>
          )}
          <button className="btn btn-sm btn-outline-primary ms-auto" onClick={onEdit}>Editar</button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>Excluir</button>
        </div>
      </div>
    </div>
  )
}
