import { useError } from "@/contexts/ErrorContext"; // Import the useError hook

const NetworkError = () => {
  const { networkError, setNetworkError } = useError(); // Access the error state and setter

  // Handle error dismissal
  const handleDismiss = () => {
    setNetworkError(null); // Reset the error when dismissed
  };

  // Only display the error if there is a networkError
  if (!networkError) return null; // Don't render the error message if there's no error

  return (
    <div className="network-error-container">
      <div className="network-error">
        <span>{networkError}</span>
        <button onClick={handleDismiss} className="dismiss-btn">Dismiss</button>
      </div>
    </div>
  );
};

export default NetworkError;
