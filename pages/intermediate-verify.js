import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function IntermediateVerify() {
  const [countdown, setCountdown] = useState(10);
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();
  const countdownRef = useRef(null);

  useEffect(() => {
    // Open ad link in new tab
    window.location.href = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

    // Start countdown
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setShowContinue(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Intercept back button
    const handlePopState = () => {
      // Instead of exiting, stay on intermediate page or redirect
      router.replace("/"); // Or "/verify" if you want to force them back to verify page
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearInterval(countdownRef.current);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const handleContinue = () => {
    router.replace("/verification-success");
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verification in Progress</h2>
        <p>We opened the verification ad link in a new tab.</p>
        {!showContinue && (
          <p className="timerText">⏳ Please wait: {countdown} seconds</p>
        )}
        {showContinue && (
          <button onClick={handleContinue} className="verifyButton1">
            ✅ Continue
          </button>
        )}
        <p>After countdown, please return and click Continue to proceed.</p>
      </div>
    </div>
  );
}
