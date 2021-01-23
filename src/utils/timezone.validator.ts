import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'timezoneValidator', async: false })
export class TimezoneValidator implements ValidatorConstraintInterface {
  validate(timeZone: string, args: ValidationArguments): boolean {
    try {
      Intl.DateTimeFormat(undefined, { timeZone });
      return true;
    } catch (ex) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Not a valid timezone';
  }
}
