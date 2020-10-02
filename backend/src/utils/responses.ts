import { Response } from "express";

interface Res {
  success: boolean;
  status: number;
  error?: string;
  data?: any;
}

export const errorResponse = (error: Error, status: number): Res => ({
  success: false,
  status,
  error: error.message,
});

export const successResponse = (data: any, status: number): Res => ({
  success: true,
  status,
  data,
});

export const handleResponse = (
  res: Response,
  error: Error | null,
  data: any,
  status: number
): void => {
  const jsonResponse = error
    ? errorResponse(error, status)
    : successResponse(data, status);
  res.status(status).json(jsonResponse);
};
