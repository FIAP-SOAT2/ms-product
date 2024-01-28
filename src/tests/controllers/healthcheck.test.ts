import request from 'supertest';
import setupApp from '../../main/config/app';

jest.mock('@prisma/client');
describe('healthcheckController', () => {
  let server;
  let app;

  beforeEach(async function () {
    app = setupApp();
    server = app.listen(3000, () => {});
  });
  afterEach(async function () {
    jest.clearAllMocks();
    server.close();
  });

  test('should return 200', async () => {
    const response = await request(server).get('/api/health');
    expect(response.status).toBe(200);
  });
});
