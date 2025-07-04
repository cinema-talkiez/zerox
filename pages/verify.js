import { FcApproval } from "react-icons/fc";
import React, { useState, useEffect } from 'react';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [countdown, setCountdown] = useState(20); // Start countdown at 20 seconds

  // Adsterra direct link
  const adsterraUrl = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

  // Handle verification on button click
  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");
    setCountdown(20); // Reset countdown to 20 seconds

    try {
      console.log("Opening Adsterra URL:", adsterraUrl);

      // Open the Adsterra URL in a new tab
      window.open(adsterraUrl, "_blank");

      // Start countdown timer
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowContinueButton(true); // Show Continue button when countdown reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second
    } catch (error) {
      console.error("Error during verification:", error);
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
      setCountdown(0); // Reset countdown on error
    }
  };

  // Handle Continue button click
  const handleContinue = () => {
    // Redirect to verification-success.js route
    window.location.href = "/verification-success/";
  };

  // Cleanup interval and timeout on component unmount
  useEffect(() => {
    return () => {
      setShowContinueButton(false);
      setCountdown(0); // Reset countdown on unmount
    };
  }, []);

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>
        <h1 className="timeoutText">Access Timeout: 24hrs</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button onClick={handleVerification} disabled={isVerifying} className="verifyButton1">
          <FcApproval className="icon1" />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>

        {isVerifying && countdown > 0 && (
          <p className="countdown">Please wait: {countdown} seconds remaining...</p>
        )}

        {showContinueButton && (
          <div className="popup">
            <button onClick={handleContinue} className="continueButton">
              Continue
            </button>
          </div>
        )}
        
        <p>After verification, click Continue to proceed...</p>
      </div>

      {/* Inline CSS for the popup and countdown */}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }
        .continueButton {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .continueButton:hover {
          background-color: #45a049;
        }
        .countdown {
          margin-top: 10px;
          font-size: 16px;
          color: #333;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
