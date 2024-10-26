export interface FieldError {
  constraintType: string;
  field: string;
  message: string;
  invalidValue: string;
}

export type FieldErrors = Array<FieldError>;

export interface ErrorResponse {
  message: string;
  status: number;
  path: string;
  timestamp: number;
  fields?: FieldErrors
}
