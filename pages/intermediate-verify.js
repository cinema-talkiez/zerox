import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function IntermediateVerify() {
  const [countdown, setCountdown] = useState(10);
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();
  const countdownRef = useRef(null);

  useEffect(() => {
    const adLink = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

    // Open ad link in external app via Android interface, with fallback
    if (window.AndroidInterface?.openExternalLink) {
      window.AndroidInterface.openExternalLink(adLink);
    } else {
      // Fallback for non-WebView environments (e.g., testing in browser)
      console.warn("AndroidInterface not available, opening ad link in new tab");
      window.open(adLink, '_blank');
    }

    // Prevent back navigation in WebView by pushing a dummy state
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

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

    return () => {
      clearInterval(countdownRef.current);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleContinue = () => {
    router.replace("/verification-success");
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verification in Progress</h2>
        <p>We opened the verification ad link in an external app.</p>
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
