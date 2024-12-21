import { createMocks } from 'node-mocks-http';
import handler from '../api/orders';

describe('Orders API', () => {
  it('should create an order with valid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        products: [{ id: 1, quantity: 2 }],
        totalPrice: 360,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Order created successfully');
    expect(data.products).toHaveLength(1);
  });

  it('should return 400 for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { totalPrice: 360 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
