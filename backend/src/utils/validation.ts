import { validate, ValidationError } from 'class-validator';

export interface FieldErrors {
  [key: string]: string;
}

export function transform(validationErrors: ValidationError[]): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const { property, constraints } of validationErrors) {
    fieldErrors[property] = Object.values(constraints).join(', ');
  }
  return fieldErrors;
}

export async function validateObj(object: Object): Promise<FieldErrors> {
  const validationErrors = await validate(object);
  const errorResponse = transform(validationErrors);
  return errorResponse;
}
