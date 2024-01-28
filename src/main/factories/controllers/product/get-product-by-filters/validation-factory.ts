import { ValidationComposite } from '../../../../../infra/http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../../../infra/http/validations/RequiredFieldValidation';
import { EnumFieldValidation } from '../../../../../infra/http/validations/EnumFieldValidation';
import { EnumValidatorAdapter } from '../../../../../infra/http/validators/EnumValidatorAdapter';
import { CategoryEnum } from '../../../../../domain/enum/ProductEnum';

export const makeGetProductByFiltersValidation = (): ValidationComposite => {
  const enumValidator = new EnumValidatorAdapter();

  return new ValidationComposite([new RequiredFieldValidation('category'), new EnumFieldValidation('category', enumValidator, CategoryEnum)], 'query');
};
