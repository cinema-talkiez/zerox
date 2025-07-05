import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function IntermediateVerify() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const countdownRef = useRef(null);

  useEffect(() => {
    // Automatically open ad link in new tab
    window.open("https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953", "_blank");

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          // Automatically redirect after countdown
          router.replace("/verification-success");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownRef.current);
  }, [router]);

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verification in Progress</h2>
        <p>We opened the verification ad link in a new tab.</p>
        <p className="timerText">⏳ Please wait: {countdown} seconds</p>
        <p>After countdown, you will be automatically redirected.</p>
      </div>
    </div>
  );
}
