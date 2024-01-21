import { ValidationComposite } from '../../../../../infra//http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../../../infra//http/validations/RequiredFieldValidation';
import { NumberValidatorAdapter } from '../../../../../infra/http/validators/NumberValidatorAdapter';
import { EnumValidatorAdapter } from '../../../../../infra/http/validators/EnumValidatorAdapter';
import { NumberFieldValidation } from '../../../../../infra/http/validations/NumberFieldValidation';
import { EnumFieldValidation } from '../../../../../infra/http/validations/EnumFieldValidation';
import { CategoryEnum } from '../../../../../domain/enum/ProductEnum';

export const makeCreateProductValidation = (): ValidationComposite => {
  const numberValidator = new NumberValidatorAdapter();
  const enumValidator = new EnumValidatorAdapter();

  return new ValidationComposite([new RequiredFieldValidation('name'), new EnumFieldValidation('category', enumValidator, CategoryEnum), new NumberFieldValidation('price', numberValidator), new NumberFieldValidation('stock', numberValidator)], 'body');
};
