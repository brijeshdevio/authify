// =========== API RESPONSE ===========
export interface IApiResponse<T, U> {
  status?: number;
  message?: string;
  data?: T | Record<string | number, any>;
  rest?: U;
}
