export type Vehicle = {
  chassi: string
  tipoVeiculo: number
  tipoVeiculoDescricao: string
  cor: string
  identifier: string
  licensePlate: string
  trackerSerialNumber: string
  latitude: number
  longitude: number
}

export type CreateVehicle = {
  chassi: string
  tipoVeiculo: number
  cor: string
  identifier: string
  licensePlate: string
  trackerSerialNumber: string
  latitude: number
  longitude: number
}
