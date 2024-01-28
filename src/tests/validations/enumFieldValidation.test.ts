import { EnumValidatorAdapter } from '../../infra/http/validators/EnumValidatorAdapter';
import validator from 'validator';


jest.mock('validator', () => ({
  isAlpha: jest.fn(),
})); 

describe('EnumValidatorAdapter', () => {
  const enumValidatorAdapter = new EnumValidatorAdapter();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true for a valid alphabetic enum value', () => {
    const dataEnum = 'validValue';
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };


    (validator.isAlpha as jest.Mock).mockReturnValue(true);

    const result = enumValidatorAdapter.isValid(dataEnum, typeEnum);

    expect(result).toBe(false);

  });

  it('should return false for an invalid non-alphabetic enum value', () => {
    const dataEnum = '123';
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };

    (validator.isAlpha as jest.Mock).mockReturnValue(false);

    const result = enumValidatorAdapter.isValid(dataEnum, typeEnum);

    expect(result).toBe(false);
  });

  it('should return false for an invalid alphabetic enum value not in typeEnum', () => {
    const dataEnum = 'invalidValue';
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };


    (validator.isAlpha as jest.Mock).mockReturnValue(true);

    const result = enumValidatorAdapter.isValid(dataEnum, typeEnum);

    expect(result).toBe(false);

  });

  it('should return false for undefined dataEnum', () => {
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };

    const result = enumValidatorAdapter.isValid(undefined, typeEnum);

    expect(result).toBe(false);

  });
});
