export const errorResponse = (error, status) => ({
  success: false,
  status,
  error: error.message,
});

export const successResponse = (data, status) => ({
  success: true,
  status,
  data,
});

export const handleResponse = async (res, error, data, status) => {
  const jsonResponse = error
    ? errorResponse(error, status)
    : successResponse(data, status);
  res.status(status).json(jsonResponse);
};
