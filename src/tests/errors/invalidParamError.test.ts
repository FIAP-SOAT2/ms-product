import { InvalidParamError } from '../../infra/http/errors/InvalidParamError';

describe('InvalidParamError', () => {
  it('should create an instance of InvalidParamError with the correct message and name', () => {
    const paramName = 'exampleParam';
    const error = new InvalidParamError(paramName);

    expect(error).toBeInstanceOf(InvalidParamError);
    expect(error.message).toBe(`Invalid param: ${paramName}`);
    expect(error.name).toBe('InvalidParamError');
  });
});
