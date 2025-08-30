import { useEffect, useMemo, useState } from 'react'
import { listVehicles } from '../api/http'
import type { Vehicle } from '../types'
import { useGeo } from '../hooks/useGeo'
import { haversine } from '../utils/distance'
import VehicleMap from '../components/VehicleMap'
import { Link } from 'react-router-dom'
import '../styles/VehiclesList.css'

export default function VehiclesList() {
  const [data, setData] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const { coords, error } = useGeo()
  const [focus, setFocus] = useState<{ lat: number; lng: number } | null>(null)
  const [hasAutoFocused, setHasAutoFocused] = useState(false) 
  const [didResetPage, setDidResetPage] = useState(false)    

  const pageSize = 10
  const [page, setPage] = useState(1)

  useEffect(() => {
    let alive = true
    listVehicles()
      .then(v => { if (alive) setData(v) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const sorted = useMemo(() => {
    if (!coords) return data
    const user = { latitude: coords.lat, longitude: coords.lng }
    return [...data]
      .map((v, i) => ({
        v,
        d: haversine(user, { latitude: v.latitude, longitude: v.longitude }),
        i
      }))
      .sort((a, b) => (a.d - b.d) || (a.i - b.i))
      .map(x => x.v)
  }, [data, coords])

  useEffect(() => {
    if (coords && !didResetPage) {
      setPage(1)
      setDidResetPage(true)
    }
  }, [coords, didResetPage])

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  useEffect(() => {
    setPage(p => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, total)
  const paged = useMemo(() => sorted.slice(startIndex, endIndex), [sorted, startIndex, endIndex])

  const center = coords
    ? { lat: coords.lat, lng: coords.lng }
    : { lat: sorted[0]?.latitude ?? -23.55, lng: sorted[0]?.longitude ?? -46.63 }

  const nearest = sorted[0] ?? null
  useEffect(() => {
    if (!hasAutoFocused && !focus && nearest) {
      setFocus({ lat: nearest.latitude, lng: nearest.longitude })
      setHasAutoFocused(true)
    }
  }, [hasAutoFocused, focus, nearest?.chassi])

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
              vehicles={sorted} 
              user={coords ? { lat: coords.lat, lng: coords.lng } : undefined}
              focus={focus}   
              focusZoom={15}
            />
            <div className="note" style={{ marginTop: 8 }}>
              {coords
                ? <>Ordenado por <span className="kbd">proximidade</span> do seu ponto atual.</>
                : <>Sem permissão de geolocalização — mostrando na ordem recebida.</>}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="cardHeader">Lista de veículos</div>
          <div className="cardBody tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Placa</th>
                  <th>Atributos</th>
                  <th>Coordenadas</th>
                  {coords && <th>Distância</th>}
                </tr>
              </thead>
              <tbody>
                {paged.map(v => {
                  const km = coords
                    ? haversine(
                        { latitude: coords.lat, longitude: coords.lng },
                        { latitude: v.latitude, longitude: v.longitude }
                      ).toFixed(2)
                    : undefined

                  return (
                    <tr
                      key={v.chassi}
                      className="rowClickable"
                      onClick={() => setFocus({ lat: v.latitude, lng: v.longitude })}
                      title="Ir para a posição no mapa"
                    >
                      <td>
                        <div style={{ fontWeight: 600 }}>{v.identifier}</div>
                        <small className="note">{v.chassi}</small>
                      </td>
                      <td><span className="kbd">{v.licensePlate}</span></td>
                      <td>
                        <div className="chips">
                          <span className="chip">{v.tipoVeiculoDescricao}</span>
                          <span className="chip gray">{v.cor}</span>
                          <span className="chip green">SN: {v.trackerSerialNumber}</span>
                        </div>
                      </td>
                      <td>
                        <div className="note">{v.latitude}, {v.longitude}</div>
                      </td>
                      {coords && <td className="dist">{km} km</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="pagination">
              <span className="pageInfo">
                {total === 0
                  ? 'Nenhum veículo'
                  : <>Mostrando <strong>{startIndex + 1}</strong>–<strong>{endIndex}</strong> de <strong>{total}</strong></>}
              </span>
              <button
                className="btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                aria-label="Página anterior"
              >
                ‹ Anterior
              </button>
              <span className="pageNumber">{page} / {totalPages}</span>
              <button
                className="btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                aria-label="Próxima página"
              >
                Próxima ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
