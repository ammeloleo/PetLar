import Pet from '../models/Pet.js'

export async function getAll(req, res) {
  try {
    const { status, especie, search } = req.query
    const filtro = {}

    if (status) filtro.status = status
    if (especie) filtro.especie = especie
    if (search) {
      filtro.$or = [
        { nome: { $regex: search, $options: 'i' } },
        { raca: { $regex: search, $options: 'i' } }
      ]
    }

    const pets = await Pet.find(filtro).sort({ createdAt: -1 })
    res.json({ success: true, data: pets, total: pets.length })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export async function getById(req, res) {
  try {
    const pet = await Pet.findById(req.params.id)
    if (!pet) return res.status(404).json({ success: false, message: 'Pet não encontrado' })
    res.json({ success: true, data: pet })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export async function create(req, res) {
  try {
    const pet = new Pet(req.body)
    await pet.save()
    res.status(201).json({ success: true, data: pet })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export async function update(req, res) {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!pet) return res.status(404).json({ success: false, message: 'Pet não encontrado' })
    res.json({ success: true, data: pet })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export async function updateStatus(req, res) {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!pet) return res.status(404).json({ success: false, message: 'Pet não encontrado' })
    res.json({ success: true, data: pet })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export async function remove(req, res) {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id)
    if (!pet) return res.status(404).json({ success: false, message: 'Pet não encontrado' })
    res.json({ success: true, message: 'Pet removido' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
