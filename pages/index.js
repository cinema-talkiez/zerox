import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from 'react';

export default function HomePage() {
  const [validToken, setValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const router = useRouter();

  // Function to check token validity
  const checkTokenValidity = () => {
    const storedValidToken = localStorage.getItem("validToken");
    const storedExpirationTime = localStorage.getItem("validTokenExpiration");

    if (storedValidToken === "true" && storedExpirationTime) {
      if (Date.now() < parseInt(storedExpirationTime)) {
        setValidToken(true); // Token is valid
      } else {
        // Token expired
        setValidToken(false);
        localStorage.removeItem("validToken");
        localStorage.removeItem("validTokenExpiration");
      }
    } else {
      setValidToken(false);
    }
    setCheckingToken(false);
  };

  useEffect(() => {
    checkTokenValidity(); // Check on mount

    // Listen for storage changes (for when `validToken` updates in verification-success.js)
    const handleStorageChange = () => {
      checkTokenValidity();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h1>Hello Mama! Welcome to Cinema Talkiez</h1>
        <p>
          Cinema Talkiez is specially designed for middle-class movie lovers. This is an affordable entertainment with vast collection of movies
          without the financial burden.
        </p>
        <p>OUT content is regularly added to watch/download.</p>
        {checkingToken ? (
          <p className="loading-text">Checking token...</p>
        ) : (
          <>
            {!validToken && (
              <button onClick={() => window.open("/verification-success", "_blank")} className="verifyButton">
  Verify Token
</button>

            )}

            {validToken && (
              <Link href="/index1">
                <button className="visitButton">Visit HomePage</button>
              </Link>
            )}
          </>
        )}

        {/* Adding styles */}
        <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }

        .loading-text {
        
          font-size: 18px;
          color: white;
        }

        button {
          padding: 12px 24px;
          font-size: 18px;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: 0.3s;
          margin: 10px;
          width: 200px;
        }

        .verifyButton {
          background-color: #ff5722;
          color: white;
        }



        .visitButton {
          background-color: #4caf50;
          color: white;
        }

        .visitButton:hover {
          background-color: #388e3c;
        }
      `}</style>
      </div>
    </div>
  );
}
