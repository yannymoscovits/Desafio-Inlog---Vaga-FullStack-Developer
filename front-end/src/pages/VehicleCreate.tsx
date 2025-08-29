import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import VehicleMap from '../components/VehicleMap'
import { createVehicle, listVehicles } from '../api/http'
import { useGeo } from '../hooks/useGeo'
import { haversine } from '../utils/distance'
import type { CreateVehicle, Vehicle } from '../types'
import '../styles/VehiclesList.css'

const schema = yup.object({
  chassi: yup.string().required('Chassi é obrigatório'),
  tipoVeiculo: yup.number().oneOf([1, 2]).required(),
  cor: yup.string().required(),
  identifier: yup.string().required(),
  licensePlate: yup.string().required(),
  trackerSerialNumber: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
})

export default function VehicleCreate() {
  const [data, setData] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const { coords, error } = useGeo() 
  const navigate = useNavigate()

  useEffect(() => {
    listVehicles().then(setData).finally(() => setLoading(false))
  }, [])

  const sorted = useMemo(() => {
    if (!coords) return data
    const user = { latitude: coords.lat, longitude: coords.lng }
    return [...data]
      .map((v, i) => ({
        v,
        d: haversine(user, { latitude: v.latitude, longitude: v.longitude }),
        i,
      }))
      .sort((a, b) => (a.d - b.d) || (a.i - b.i))
      .map(x => x.v)
  }, [data, coords])

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: sorted[0]?.latitude ?? -23.55,
    lng: sorted[0]?.longitude ?? -46.63,
  })

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<CreateVehicle>({
      resolver: yupResolver(schema),
      defaultValues: {
        chassi: '',
        tipoVeiculo: 1,
        cor: 'Azul',
        identifier: '',
        licensePlate: '',
        trackerSerialNumber: '',
        latitude: center.lat,
        longitude: center.lng,
      }
    })

  useEffect(() => {
    if (coords) {
      const c = { lat: coords.lat, lng: coords.lng }
      setCenter(c)
      setValue('latitude', c.lat, { shouldValidate: true })
      setValue('longitude', c.lng, { shouldValidate: true })
    }
  }, [coords, setValue])

  const latitude = watch('latitude')
  const longitude = watch('longitude')
  const tempVehicle: Vehicle = {
    chassi: 'temp',
    tipoVeiculo: watch('tipoVeiculo') ?? 1,
    tipoVeiculoDescricao: (watch('tipoVeiculo') === 2 ? 'Caminhão' : 'Ônibus'),
    cor: watch('cor') || 'Azul',
    identifier: watch('identifier') || 'Novo veículo',
    licensePlate: watch('licensePlate') || '---',
    trackerSerialNumber: watch('trackerSerialNumber') || '---',
    latitude,
    longitude
  }

  const onSubmit = async (payload: CreateVehicle) => {
    try {
      await createVehicle(payload)
      navigate('/veiculos')
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? err?.message ?? 'Falha ao cadastrar veículo'
      alert(msg)
    }
  }

  if (loading) return <p className="page">Carregando…</p>

  return (
    <div className="page">
      <div className="header">
        <h2 className="title">Veículos</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link className="btn" to="/veiculos">Listar</Link>
          <Link className="btn" to="/veiculos/novo">+ Cadastrar</Link>
        </div>
      </div>

      {error && <small className="note">Geolocalização: {error}</small>}

      <div className="grid">
        <div className="card">
          <div className="cardHeader">Mapa</div>
          <div className="cardBody">
            <VehicleMap
              center={center}
              vehicles={[tempVehicle]}
              user={coords ? { lat: coords.lat, lng: coords.lng } : undefined}
              onPickCoords={(lat, lng) => {
                setCenter({ lat, lng })
                setValue('latitude', lat, { shouldValidate: true })
                setValue('longitude', lng, { shouldValidate: true })
              }}
            />
            <div className="note" style={{ marginTop: 8 }}>
              {coords
                ? <>Clique no mapa para ajustar as coordenadas a partir da sua posição.</>
                : <>Sem permissão de geolocalização — defina Latitude/Longitude no mapa.</>}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">Cadastro de veículo</div>
          <div className="cardBody">
            <form onSubmit={handleSubmit(onSubmit)} className="formGrid2">
              <div className="formControl">
                <label>Chassi</label>
                <input {...register('chassi')} placeholder="Ex.: 9BWZZZ377VT004251" />
                <small className="error">{errors.chassi?.message}</small>
              </div>

              <div className="formControl">
                <label>Tipo</label>
                <select {...register('tipoVeiculo')}>
                  <option value={1}>Ônibus</option>
                  <option value={2}>Caminhão</option>
                </select>
                <small className="error">{errors.tipoVeiculo?.message}</small>
              </div>

              <div className="formControl">
                <label>Cor</label>
                <input {...register('cor')} placeholder="Ex.: Azul" />
                <small className="error">{errors.cor?.message}</small>
              </div>

              <div className="formControl">
                <label>Identificador</label>
                <input {...register('identifier')} placeholder="Ex.: Vehicle 123" />
                <small className="error">{errors.identifier?.message}</small>
              </div>

              <div className="formControl">
                <label>Placa</label>
                <input {...register('licensePlate')} placeholder="Ex.: ABC-1D23" />
                <small className="error">{errors.licensePlate?.message}</small>
              </div>

              <div className="formControl">
                <label>Serial do Rastreador</label>
                <input {...register('trackerSerialNumber')} placeholder="Ex.: SN A000123" />
                <small className="error">{errors.trackerSerialNumber?.message}</small>
              </div>

              <div className="formControl">
                <label>Latitude</label>
                <input type="number" step="any" {...register('latitude', { valueAsNumber: true })} placeholder="-23.55" />
                <small className="error">{errors.latitude?.message}</small>
              </div>

              <div className="formControl">
                <label>Longitude</label>
                <input type="number" step="any" {...register('longitude', { valueAsNumber: true })} placeholder="-46.63" />
                <small className="error">{errors.longitude?.message}</small>
              </div>

              <div className="formActions">
                <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando…' : 'Salvar'}
                </button>
                <button className="btn" type="button" onClick={() => navigate('/veiculos')}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
