interface SerializeError {
  error: Error;
  status: number;
}

const serializeError = (message: string): SerializeError => ({
  error: new Error(message),
  status: 400,
});

export default serializeError;
