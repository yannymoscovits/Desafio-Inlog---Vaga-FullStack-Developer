const base = '/api';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('GET /vehicles retorna lista', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(
    JSON.stringify([{ chassi: 'A' }, { chassi: 'B' }]),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  ) as any);

  const res = await fetch(`${base}/vehicles`);
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data[0]).toHaveProperty('chassi');
});

test('POST /vehicles 201', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(
    JSON.stringify({ chassi: 'ABC' }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  ) as any);

  const res = await fetch(`${base}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chassi: 'ABC' }),
  });
  expect(res.status).toBe(201);
});

test('POST /vehicles 400 sem chassi', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(
    JSON.stringify({ message: 'chassi required' }),
    { status: 400, headers: { 'Content-Type': 'application/json' } }
  ) as any);

  const res = await fetch(`${base}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  expect(res.status).toBe(400);
});
