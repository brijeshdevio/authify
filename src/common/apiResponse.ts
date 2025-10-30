import { Response } from 'express';
import { IApiResponse } from 'src/types';

const defaultResponse = {
  status: 200,
  message: 'Success',
  data: {},
};

export function apiResponse<T, U>(
  res: Response,
  { status = 200, message, data, rest }: IApiResponse<T, U> = defaultResponse,
) {
  return res.status(status).json({
    statusCode: status,
    success: true,
    status: 'success',
    message,
    data,
    ...rest,
  });
}
