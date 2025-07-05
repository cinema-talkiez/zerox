import { FcApproval } from "react-icons/fc";
import React, { useState } from 'react';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Adsterra direct link
  const adsterraUrl = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

  // Handle verification on button click
  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");

    try {
      console.log("Opening Adsterra URL:", adsterraUrl);

      // Open the Adsterra URL in a new tab
      window.open(adsterraUrl);
    } catch (error) {
      console.error("Error during verification:", error);
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verify Your Access</h2>
        <p>Click the button below to open the verification ad in a new tab. Keep the ad tab open to complete verification.</p>
        <h1 className="timeoutText">Access Timeout: 24hrs</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button onClick={handleVerification} disabled={isVerifying} className="verifyButton1">
          <FcApproval className="icon1" />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>
        
        <p>After verification, follow the instructions in the app to continue...</p>
      </div>
    </div>
  );
}
