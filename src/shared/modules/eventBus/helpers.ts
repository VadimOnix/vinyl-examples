export const withTimeout = async <T>(request: () => Promise<T>, timeout = 30000): Promise<T> => {
  const timeoutErrorRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('[withTimeout] Request timed out')), timeout);
  });

  const result = await Promise.race([request(), timeoutErrorRequest]);
  return result as Promise<T>;
};
