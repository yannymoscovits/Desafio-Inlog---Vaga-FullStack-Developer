import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';


jest.mock(
  'react-router-dom',
  () => {
    const mockNavigate = jest.fn();
    return {
      __esModule: true,
      useNavigate: () => mockNavigate,
      Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
      __mocked: { mockNavigate },
    };
  },
  { virtual: true }
);

const getMockNavigate = () =>
  (require('react-router-dom').__mocked.mockNavigate as jest.Mock);

jest.mock('../components/VehicleMap', () => ({
  __esModule: true,
  default: ({ onPickCoords }: { onPickCoords?: (lat: number, lng: number) => void }) => (
    <div data-testid="vehicle-map">
      MAP
      {onPickCoords && (
        <button onClick={() => onPickCoords(-23.5001, -46.6001)} data-testid="pick-coords">
          pick
        </button>
      )}
    </div>
  ),
}));

jest.mock('../api/http', () => {
  const listVehicles = jest.fn().mockResolvedValue([]);
  const createVehicle = jest.fn();
  return {
    __esModule: true,
    listVehicles,
    createVehicle,
  };
});

import { listVehicles, createVehicle } from '../api/http';
import VehicleCreate from '../pages/VehicleCreate';

describe('VehicleCreate', () => {
  beforeEach(() => {
    // zera estados entre testes
    (listVehicles as jest.Mock).mockReset().mockResolvedValue([]);
    (createVehicle as jest.Mock).mockReset();
    getMockNavigate().mockReset();
  });

  it('envia o formulário, chama a API e navega para /veiculos', async () => {
    (createVehicle as jest.Mock).mockResolvedValue({ status: 201 });

    render(<VehicleCreate />);

    await screen.findByText(/Cadastro de veículo/i);

    await userEvent.type(
      screen.getByPlaceholderText(/Ex\.: 9BWZZZ377VT004251/i),
      'XYZ123'
    );
    await userEvent.type(screen.getByPlaceholderText(/Ex\.: Vehicle 123/i), 'Truck SP');
    await userEvent.type(screen.getByPlaceholderText(/Ex\.: ABC-1D23/i), 'ABC-1D23');
    await userEvent.type(screen.getByPlaceholderText(/Ex\.: SN A000123/i), 'SN-001');

    await userEvent.click(screen.getByTestId('pick-coords'));
    await userEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(createVehicle).toHaveBeenCalledTimes(1);
      expect(createVehicle).toHaveBeenCalledWith(
        expect.objectContaining({
          chassi: 'XYZ123',
          identifier: 'Truck SP',
          licensePlate: 'ABC-1D23',
          trackerSerialNumber: 'SN-001',
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        })
      );
      expect(getMockNavigate()).toHaveBeenCalledWith('/veiculos');
    });
  });

  it('exibe alerta quando a API falha', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (createVehicle as jest.Mock).mockRejectedValue(new Error('Falha ao cadastrar veículo'));

    render(<VehicleCreate />);

    await screen.findByText(/Cadastro de veículo/i);

    await userEvent.type(
      screen.getByPlaceholderText(/Ex\.: 9BWZZZ377VT004251/i),
      'XYZ123'
    );
    await userEvent.type(screen.getByPlaceholderText(/Ex\.: Vehicle 123/i), 'Truck SP');
    await userEvent.type(screen.getByPlaceholderText(/Ex\.: ABC-1D23/i), 'ABC-1D23');
    await userEvent.type(screen.getByPlaceholderText(/Ex\.: SN A000123/i), 'SN-001');

    await userEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });

    alertSpy.mockRestore();
  });
});
