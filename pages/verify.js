import { FcApproval } from "react-icons/fc";
import React, { useState } from 'react';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Adsterra direct link
  const adsterraUrl = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

  // Handle verification on button click
  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");
    setShowPopup(true); // Show popup immediately

    try {
      console.log("Opening Adsterra URL:", adsterraUrl);

      // Open the Adsterra URL in a new tab
      window.open(adsterraUrl, "_blank");
    } catch (error) {
      console.error("Error during verification:", error);
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
      setShowPopup(false); // Hide popup on error
    }
  };

  // Handle continue button click in popup
  const handleContinue = () => {
    setShowPopup(false);
    setIsVerifying(false);
    // Redirect to verification-success route
    window.location.href = "/verification-success";
    console.log("Redirecting to /verification-success");
  };

  // Inline styles
  const styles = {
    glassmorphismPage: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6', // bg-gray-100
    },
    container: {
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      maxWidth: '28rem',
      width: '100%',
    },
    timeoutText: {
      color: '#ef4444', // text-red-500
      fontSize: '1.125rem',
      fontWeight: '600',
      marginTop: '1rem',
    },
    error: {
      color: '#dc2626', // text-red-600
      marginTop: '0.5rem',
    },
    verifyButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4f46e5', // bg-indigo-600
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      marginTop: '1rem',
      border: 'none',
      cursor: isVerifying ? 'not-allowed' : 'pointer',
      opacity: isVerifying ? 0.5 : 1,
    },
    verifyButtonHover: {
      backgroundColor: '#4338ca', // hover:bg-indigo-700
    },
    icon: {
      marginRight: '0.5rem',
    },
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popupContent: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '90%',
    },
    continueButton: {
      backgroundColor: '#4f46e5', // bg-indigo-600
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      marginTop: '1rem',
    },
    continueButtonHover: {
      backgroundColor: '#4338ca', // hover:bg-indigo-700
    },
  };

  return (
    <div style={styles.glassmorphismPage}>
      <div style={styles.container}>
        <h2>Verify Your Access</h2>
        <p>Click the button below to open the verification ad in a new tab. Keep the ad tab open to complete verification.</p>
        <h1 style={styles.timeoutText}>Access Timeout: 24hrs</h1>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button
          onClick={handleVerification}
          disabled={isVerifying}
          style={styles.verifyButton}
          onMouseEnter={(e) => !isVerifying && (e.currentTarget.style.backgroundColor = styles.verifyButtonHover.backgroundColor)}
          onMouseLeave={(e) => !isVerifying && (e.currentTarget.style.backgroundColor = styles.verifyButton.backgroundColor)}
        >
          <FcApproval style={styles.icon} />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>
        
        <p>After verification, follow the instructions in the app to continue...</p>
      </div>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>Verification In Progress</h3>
            <p>Please keep the ad tab open to complete the verification process, then click Continue.</p>
            <button
              onClick={handleContinue}
              style={styles.continueButton}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.continueButtonHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.continueButton.backgroundColor)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
