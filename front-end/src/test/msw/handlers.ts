import { rest } from 'msw';

const base = '/api';

type CreateVehicleBody = { chassi: string; [k: string]: any };
function isCreateVehicleBody(x: unknown): x is CreateVehicleBody {
  return !!x && typeof x === 'object' && 'chassi' in (x as any);
}

export const handlers = [
  rest.get(`${base}/vehicles`, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
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
      ])
    )
  ),

  rest.post(`${base}/vehicles`, async (req, res, ctx) => {
    const raw = (await req.json()) as unknown;
    if (!isCreateVehicleBody(raw) || !raw.chassi) {
      return res(ctx.status(400), ctx.json({ message: 'chassi required' }));
    }
    return res(ctx.status(201), ctx.json({ ...raw }));
  }),
];
