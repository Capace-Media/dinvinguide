// Types for the result object with discriminated union
type Success<T> = {
  status: "success";
  data: T;
  error: null;
};

type Failure<E> = {
  status: "error";
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  errorTransform?: (error: unknown) => E
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { status: "success", data, error: null };
  } catch (error) {
    return {
      status: "error",
      data: null,
      error: errorTransform ? errorTransform(error) : (error as E),
    };
  }
}

// Helper functions to work with Result objects
export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> =>
  result.error === null;

export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> =>
  result.error !== null;

// Helper to unwrap a result or throw the error
export function unwrap<T, E extends Error>(result: Result<T, E>): T {
  if (isSuccess(result)) {
    return result.data;
  }
  throw result.error;
}
