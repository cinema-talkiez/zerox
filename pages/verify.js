import { FcApproval } from "react-icons/fc";
import React from 'react';
import { useRouter } from 'next/router';

export default function VerifyPage() {
  const router = useRouter();

  const handleVerification = () => {
    router.push("/intermediate-verify");
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>
        <h1 className="timeoutText">Access Timeout: 24hrs</h1>
        <button onClick={handleVerification} className="verifyButton1">
          <FcApproval className="icon1" />
          Verify Now
        </button>
        <p>After verification, you will continue automatically.</p>
      </div>
    </div>
  );
}
