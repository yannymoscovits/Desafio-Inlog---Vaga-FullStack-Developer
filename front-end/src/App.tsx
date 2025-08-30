import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import VehiclesList from './pages/VehiclesList'
import VehicleCreate from './pages/VehicleCreate'
import logo from './img/logo.png'

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
        <img src={logo} style={{ width: '250px' }} alt="Inlog Logo" />
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/veiculos" />} />
        <Route path="/veiculos" element={<VehiclesList />} />
        <Route path="/veiculos/novo" element={<VehicleCreate />} />
      </Routes>
    </BrowserRouter>
  )
}
