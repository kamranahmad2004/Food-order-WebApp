import { useState, useCallback } from "react";

const useLoadingAndError = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to start loading
  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null); // Reset error when loading starts
  }, []);

  // Function to stop loading
  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  // Function to set error
  const setErrorState = useCallback((errorMessage) => {
    setLoading(false);
    setError(errorMessage);
  }, []);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
  };
};

export default useLoadingAndError;
