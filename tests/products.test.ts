let createMocks: typeof import('node-mocks-http').createMocks;

if (process.env.NODE_ENV === 'test') {
  import('node-mocks-http').then((module) => {
    createMocks = module.createMocks;
  });
}

import handler from '../src/pages/api/products';

describe('Products API', () => {
  it('should return products for a valid restaurant ID', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { restaurantId: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.name).toBe('SuperSano');
    expect(data.products).toHaveLength(9);
  });

  it('should return 400 if restaurantId is missing', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
