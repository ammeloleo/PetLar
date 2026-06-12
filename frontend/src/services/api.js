import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

export const petService = {
  getAll: (params) => api.get('/pets', { params }),
  getById: (id) => api.get(`/pets/${id}`),
  create: (data) => api.post('/pets', data),
  update: (id, data) => api.put(`/pets/${id}`, data),
  updateStatus: (id, status) => api.patch(`/pets/${id}/status`, { status }),
  remove: (id) => api.delete(`/pets/${id}`)
}
