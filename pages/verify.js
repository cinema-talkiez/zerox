import { FcApproval } from "react-icons/fc";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimestampRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        startTimestampRef.current = Date.now();

        timerRef.current = setTimeout(() => {
          setShowContinue(true);
          clearInterval(intervalRef.current);
        }, timeLeft * 1000);

        intervalRef.current = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTimestampRef.current) / 1000);
          const updatedTimeLeft = Math.max(0, 10 - elapsed);
          setTimeLeft(updatedTimeLeft);
        }, 500);
      } else if (document.visibilityState === "visible") {
        clearTimeout(timerRef.current);
        clearInterval(intervalRef.current);
        const elapsed = Math.floor((Date.now() - startTimestampRef.current) / 1000);
        setTimeLeft((prev) => Math.max(0, prev - elapsed));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleVerification = () => {
    setIsVerifying(true);
    setErrorMessage("");
    setTimeLeft(10);
    setShowContinue(false);
    window.open("https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953", "_blank");
  };

  const handleContinue = () => {
    router.push("/verification-success");
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>
        <h1 className="timeoutText">Access Timeout: 24hrs</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {!isVerifying && (
          <button onClick={handleVerification} className="verifyButton1">
            <FcApproval className="icon1" />
            Verify Now
          </button>
        )}
        {isVerifying && !showContinue && (
          <button disabled className="verifyButton1">
            <FcApproval className="icon1" />
            Verifying...
          </button>
        )}
        {isVerifying && !showContinue && (
          <p className="timerText">⏳ Time remaining: {timeLeft} seconds</p>
        )}
        {showContinue && (
          <button onClick={handleContinue} className="verifyButton1">
            ✅ Continue
          </button>
        )}
        <p>After verification, you will automatically redirect...</p>
      </div>
    </div>
  );
}
