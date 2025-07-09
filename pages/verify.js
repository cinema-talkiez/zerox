import { FcApproval } from "react-icons/fc";
import React, { useState } from 'react';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle verification on button click
  const handleVerification = () => {
    setIsVerifying(true);
    setErrorMessage("");

    try {
      const fixedUrl = "https://exe.io/YM7Bi";
      window.location.href = fixedUrl; // Works in WebView and browser
    } catch (error) {
      setErrorMessage("An error occurred while opening the verification link.");
      setIsVerifying(false);
    }
  };

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
        
        <p>After verification, you will automatically redirect...</p>
      </div>
    </div>
  );
}
