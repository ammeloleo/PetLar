import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  especie: {
    type: String,
    required: true,
    enum: ['cachorro', 'gato', 'coelho', 'pássaro', 'outro'],
    default: 'cachorro'
  },
  raca: {
    type: String,
    default: 'SRD'
  },
  idade: {
    type: Number,
    required: true,
    min: 0
  },
  sexo: {
    type: String,
    required: true,
    enum: ['macho', 'fêmea']
  },
  porte: {
    type: String,
    required: true,
    enum: ['pequeno', 'médio', 'grande']
  },
  descricao: {
    type: String
  },
  vacinado: {
    type: Boolean,
    default: false
  },
  castrado: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['disponível', 'em processo', 'adotado'],
    default: 'disponível'
  },
  foto: {
    type: String,
    default: ''
  }
}, { timestamps: true })

const Pet = mongoose.model('Pet', petSchema)

export default Pet
