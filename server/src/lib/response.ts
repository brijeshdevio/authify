import type { Response } from "express";

interface ApiResponse<D = unknown, E = unknown> {
  success: boolean;
  statusCode: number;
  data: D | null;
  message?: string;
  error: E | null;
}

/**
 * Send a standardized success response.
 */
export function sendSuccess<D>(
  res: Response,
  statusCode: number,
  data: D,
  message?: string,
) {
  const body: ApiResponse<D, null> = {
    success: true,
    statusCode,
    data,
    error: null,
    ...(message && { message }),
  };
  res.status(statusCode).json(body);
}

/**
 * Send a standardized error response.
 */
export function sendError<E = string>(
  res: Response,
  statusCode: number,
  error: E,
  message?: string,
) {
  const body: ApiResponse<null, E> = {
    success: false,
    statusCode,
    data: null,
    error,
    ...(message && { message }),
  };
  res.status(statusCode).json(body);
}
