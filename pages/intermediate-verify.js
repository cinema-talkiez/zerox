import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function IntermediateVerify() {
  const [countdown, setCountdown] = useState(10);
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();
  const countdownRef = useRef(null);

  const startTimer = () => {
    if (!countdownRef.current) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            setShowContinue(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  useEffect(() => {
    const adLink = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

    // Open ad link in external app via Android interface, with fallback
    if (window.AndroidInterface?.openExternalLink) {
      window.AndroidInterface.openExternalLink(adLink);
    } else {
      console.warn("AndroidInterface not available, opening ad link in new tab");
      window.open(adLink, '_blank');
    }

    // Prevent back navigation in WebView
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    // Start timer only if page is hidden initially
    if (document.hidden) {
      startTimer();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the page — start/resume countdown
        startTimer();
      } else {
        // User came back to the page — pause countdown
        stopTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopTimer();
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
