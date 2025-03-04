// /contexts/ErrorContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ErrorContext = createContext();

// Provider component to wrap around the app and provide global error state
export const ErrorProvider = ({ children }) => {
  const [networkError, setNetworkError] = useState(null);

  // Optionally, check for the initial network status (using navigator.onLine for browser support)
  useEffect(() => {
    if (!navigator.onLine) {
      setNetworkError("Network Error: No internet connection.");
    }
  }, []);

  return (
    <ErrorContext.Provider value={{ networkError, setNetworkError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to access the error context
export const useError = () => useContext(ErrorContext);
