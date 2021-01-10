import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'timezoneValidator', async: false })
export class TimezoneValidator implements ValidatorConstraintInterface {
  validate(timeZone: string, args: ValidationArguments) {
    try {
      Intl.DateTimeFormat(undefined, { timeZone });
      return true;
    } catch (ex) {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return 'Not a valid timezone';
  }
}
