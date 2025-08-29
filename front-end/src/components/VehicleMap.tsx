import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useEffect } from 'react'
import type { Vehicle } from '../types'

type Props = {
  center: { lat: number; lng: number }
  vehicles: Vehicle[]
  user?: { lat: number; lng: number }
  height?: number
  onPickCoords?: (lat: number, lng: number) => void
  focus?: { lat: number; lng: number } | null     
  focusZoom?: number                              
}

function FocusController({ focus, zoom = 15 }: { focus?: { lat: number; lng: number } | null; zoom?: number }) {
  const map = useMap()
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lng], zoom, { duration: 0.6 })
  }, [focus, zoom, map])
  return null
}

function ClickCapture({ onPickCoords }: { onPickCoords?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) { onPickCoords?.(e.latlng.lat, e.latlng.lng) },
  })
  return null
}

export default function VehicleMap({ center, vehicles, user, height = 800, onPickCoords, focus, focusZoom }: Props) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      style={{ height, width: '100%', borderRadius: 12, overflow: 'hidden' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((v) => (
        <Marker key={v.chassi} position={[v.latitude, v.longitude]}>
          <Popup>
            <div style={{ display: 'grid', gap: 4 }}>
              <strong>{v.identifier}</strong>
              <small>Chassi: {v.chassi}</small>
              <small>Placa: {v.licensePlate}</small>
              <small>Tipo: {v.tipoVeiculoDescricao}</small>
              <small>Cor: {v.cor}</small>
              <small>SN: {v.trackerSerialNumber}</small>
              <small>Lat/Lng: {v.latitude}, {v.longitude}</small>
            </div>
          </Popup>
        </Marker>
      ))}
      {user && (
        <Marker position={[user.lat, user.lng]}>
          <Popup><strong>Você está aqui</strong></Popup>
        </Marker>
      )}
      {onPickCoords && <ClickCapture onPickCoords={onPickCoords} />}
      <FocusController focus={focus} zoom={focusZoom} />
    </MapContainer>
  )
}
