import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE, 
})

export const listVehicles = async () => {
  const { data } = await api.get('/Veiculo/Listar')
  return data
}

export const createVehicle = async (payload: any) => {
  const { data } = await api.post('/Veiculo/Cadastrar', payload)
  return data
}
