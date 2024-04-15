export interface ErrorType extends Error {
  name: string;
  status?: number;
  message: string;
  stack?: string;
  errorType?: string;
}