import {useCallback, useEffect, useRef, useState} from "react";

// Minimal stand-in for React Query's useMutation (not installed yet): wraps a
// service call with a loading flag that survives the caller unmounting.
export function useAsyncCall<TRequest, TResponse>(
  call: (request: TRequest) => Promise<TResponse>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const run = useCallback(
    async (request: TRequest) => {
      setIsLoading(true);
      try {
        return await call(request);
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [call],
  );

  return {run, isLoading};
}
