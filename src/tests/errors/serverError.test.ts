import { ServerError } from '../../infra/http/errors/ServerError';

describe('ServerError', () => {
  it('should create an instance of ServerError with the correct message and name', () => {
    const error = new ServerError();

    expect(error).toBeInstanceOf(ServerError);
    expect(error.message).toBe('Internal server error');
    expect(error.name).toBe('ServerError');
  });

  it('should create an instance of ServerError with the provided stack trace', () => {
    const stackTrace = 'Sample stack trace';
    const error = new ServerError(stackTrace);

    expect(error).toBeInstanceOf(ServerError);
    expect(error.message).toBe('Internal server error');
    expect(error.name).toBe('ServerError');
    expect(error.stack).toBe(stackTrace);
  });
});
