import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import petRoutes from './routes/pets.js'

const app = express()

app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption'

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro ao conectar:', err))

app.use('/api/pets', petRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
