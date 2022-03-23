import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidCSSColor(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      name: 'IsValidCSSColor',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            return value.match(/^#[0-9a-f]{3,6}$/i);
          } catch (e) {
            return false;
          }
        },
      },
    });
  };
}
