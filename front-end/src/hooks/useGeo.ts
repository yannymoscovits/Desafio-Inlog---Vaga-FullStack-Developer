import { useEffect, useState } from 'react'

type Coords = { lat: number; lng: number }

export function useGeo() {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Navegador não suporta geolocalização')
      return
    }

    const ok = (pos: GeolocationPosition) =>
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    const err = (e: GeolocationPositionError) => setError(e.message)

    navigator.geolocation.getCurrentPosition(ok, err, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60_000,
    })
    
    const id = navigator.geolocation.watchPosition(ok, err, {
      enableHighAccuracy: true,
      maximumAge: 60_000,
    })
    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return { coords, error }
}
