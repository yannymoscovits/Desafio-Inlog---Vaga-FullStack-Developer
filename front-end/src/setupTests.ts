import '@testing-library/jest-dom';
import 'whatwg-fetch';

const geolocationMock = {
  getCurrentPosition: (success: PositionCallback) => {
    success({
      coords: {
        latitude: -23.55,
        longitude: -46.63,
        accuracy: 1,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      } as GeolocationCoordinates,
      timestamp: Date.now(),
    } as GeolocationPosition);
  },
  watchPosition: () => 1,
  clearWatch: () => {},
} as unknown as Geolocation;
Object.defineProperty(global.navigator, 'geolocation', { value: geolocationMock });

import { TextEncoder, TextDecoder } from 'node:util';
if (!(global as any).TextEncoder) (global as any).TextEncoder = TextEncoder;
if (!(global as any).TextDecoder) (global as any).TextDecoder = TextDecoder as any;

try {
  const web = require('node:stream/web');
  (global as any).TransformStream ??= web.TransformStream;
  (global as any).ReadableStream ??= web.ReadableStream;
  (global as any).WritableStream ??= web.WritableStream;
} catch {

}

const { server } = require('./test/msw/server');

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
