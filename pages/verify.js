import { FcApproval } from "react-icons/fc";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  const leaveTimeRef = useRef(null);
  const countdownInterval = useRef(null);

  useEffect(() => {
    const handleBlur = () => {
      if (isVerifying) {
        leaveTimeRef.current = Date.now();
      }
    };

    const handleFocus = () => {
      if (isVerifying && leaveTimeRef.current) {
        const elapsed = Math.floor((Date.now() - leaveTimeRef.current) / 1000);
        if (elapsed >= 10) {
          setShowContinue(true);
        } else {
          const remaining = 10 - elapsed;
          setCountdown(remaining);
          // Start countdown
          countdownInterval.current = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countdownInterval.current);
                setShowContinue(true);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      clearInterval(countdownInterval.current);
    };
  }, [isVerifying]);

  const handleVerification = () => {
    setIsVerifying(true);
    setErrorMessage("");
    setShowContinue(false);
    setCountdown(0);
    // Open ad link
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
          <>
            <button disabled className="verifyButton1">
              <FcApproval className="icon1" />
              Verifying...
            </button>
            {countdown > 0 && (
              <p className="timerText">⏳ Please wait: {countdown} seconds</p>
            )}
            {countdown === 0 && (
              <p className="timerText">Please stay on ad page at least 10 sec before coming back.</p>
            )}
          </>
        )}
        {showContinue && (
          <button onClick={handleContinue} className="verifyButton1">
            ✅ Continue
          </button>
        )}
        <p>After verification, you must stay on ad page at least 10 seconds before returning.</p>
      </div>
    </div>
  );
}
