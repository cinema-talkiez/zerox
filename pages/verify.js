import { FcApproval } from "react-icons/fc";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(10000);
  const startTimeRef = useRef(null);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setShowContinue(true);
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = remainingTimeRef.current - elapsed;
  };

  const resumeTimer = () => {
    startTimer();
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pauseTimer();
      } else if (document.visibilityState === "visible" && isVerifying && !showContinue) {
        resumeTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVerifying, showContinue]);

  const handleVerification = () => {
    setIsVerifying(true);
    setErrorMessage("");
    window.open("https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953", "_blank");
    startTimer();
  };

  const handleContinue = () => {
    navigate("/verification-success.js");
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
        {showContinue && (
          <button onClick={handleContinue} className="verifyButton1">
            Continue
          </button>
        )}
        <p>After verification, you will automatically redirect...</p>
      </div>
    </div>
  );
}
