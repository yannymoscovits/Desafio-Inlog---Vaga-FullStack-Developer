import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock('../components/VehicleMap', () => ({
  __esModule: true,
  default: () => <div data-testid="vehicle-map">MAP</div>,
}));

jest.mock('../hooks/useGeo', () => ({
  __esModule: true,
  useGeo: () => ({ coords: { lat: -23.55, lng: -46.63 }, error: null }),
}));

jest.mock('../api/http', () => {
  const listVehicles = jest.fn();
  const createVehicle = jest.fn();
  const mod = { listVehicles, createVehicle };
  return { __esModule: true, ...mod, default: mod };
});

import VehiclesList from '../pages/VehiclesList';
import { listVehicles } from '../api/http';

const mockVehicles = [
  {
    chassi: 'A',
    identifier: 'V1',
    tipoVeiculo: 1,
    tipoVeiculoDescricao: 'Ônibus',
    cor: 'Azul',
    licensePlate: 'AAA-1111',
    trackerSerialNumber: 'SN1',
    latitude: -23.56,
    longitude: -46.64,
  },
  {
    chassi: 'B',
    identifier: 'V2',
    tipoVeiculo: 2,
    tipoVeiculoDescricao: 'Caminhão',
    cor: 'Preto',
    licensePlate: 'BBB-2222',
    trackerSerialNumber: 'SN2',
    latitude: -23.54,
    longitude: -46.61,
  },
];

beforeEach(() => {
  (listVehicles as jest.Mock).mockReset();
  (listVehicles as jest.Mock).mockResolvedValue(mockVehicles);
});

test('renderiza mapa e lista de veículos', async () => {
  render(<VehiclesList />);

  await waitFor(() => expect((listVehicles as jest.Mock)).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(screen.queryByText(/Carregando/i)).not.toBeInTheDocument());

  expect(await screen.findByTestId('vehicle-map')).toBeInTheDocument();

  expect(screen.getByText('Lista de veículos')).toBeInTheDocument();

  expect(screen.getByText('V1')).toBeInTheDocument();
  expect(screen.getByText('V2')).toBeInTheDocument();
});
