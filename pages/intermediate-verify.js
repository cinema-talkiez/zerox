import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function IntermediateVerify() {
  const [countdown, setCountdown] = useState(10);
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();
  const countdownRef = useRef(null);

  useEffect(() => {
    // Automatically open ad link when arriving on this page
    window.open("https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953", "_blank");

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

    return () => clearInterval(countdownRef.current);
  }, []);

  const handleContinue = () => {
    router.push("/verification-success");
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
        <p>After countdown, you can continue to access the content.</p>
      </div>
    </div>
  );
}
