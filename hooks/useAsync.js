import { useState, useEffect, useCallback, useRef } from 'react';

const useAsync = (asyncFunction, immediate = true, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      
      if (mountedRef.current) {
        setData(result);
        setError(null);
      }
      
      return result;
    } catch (err) {
      if (mountedRef.current) {
        setError(err);
        setData(null);
      }
      throw err;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, deps);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

export default useAsync;
