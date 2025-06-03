import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const [validToken, setValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [adBlockerDetected, setAdBlockerDetected] = useState(null);
  const router = useRouter();

  // Function to check token validity
  const checkTokenValidity = useCallback(() => {
    const storedValidToken = localStorage.getItem("validToken");
    const storedExpirationTime = localStorage.getItem("validTokenExpiration");

    if (storedValidToken === "true" && storedExpirationTime) {
      if (Date.now() < parseInt(storedExpirationTime)) {
        setValidToken(true);
      } else {
        setValidToken(false);
        localStorage.removeItem("validToken");
        localStorage.removeItem("validTokenExpiration");
      }
    } else {
      setValidToken(false);
    }
    setCheckingToken(false);
  }, []);

  // Function to detect ad blocker
  const detectAdBlocker = useCallback(async () => {
    try {
      await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
      });
      setAdBlockerDetected(false);
    } catch (error) {
      setAdBlockerDetected(true);
    }
  }, []);

  useEffect(() => {
    checkTokenValidity();
    // Only run ad blocker detection if token is not valid
    if (!validToken) {
      detectAdBlocker();
    } else {
      setAdBlockerDetected(false); // Skip ad blocker check if token is valid
    }

    const handleStorageChange = () => {
      checkTokenValidity();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [checkTokenValidity, detectAdBlocker, validToken]);

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h1>Hello Mama! Welcome to Cinema Talkiez</h1>
        <p>
          Cinema Talkiez is specially designed for middle-class movie lovers. This is an affordable entertainment with a vast collection of movies without the financial burden.
        </p>
        <p>OUT content is regularly added to watch/download.</p>

        {checkingToken ? (
          <p className="loading-text">Checking token...</p>
        ) : adBlockerDetected && !validToken ? (
          <div>
            <h2>Ad Blocker Detected</h2>
            <p>
              Please disable your ad blocker to access Cinema Talkiez. Ads help us keep our platform free for everyone.
            </p>
          </div>
        ) : (
          <>
            {!validToken ? (
              <>
                <button onClick={() => router.push("/verification-success")} className="verifyButton">
                  Verify Token
                </button>
                <button onClick={() => router.push("/share")} className="verifyButton">
                  Share
                </button>
              </>
            ) : (
              <>
                <button onClick={() => router.push("/index1")} className="visitButton">
                  Visit HomePage
                </button>
                <p>Verify again if ads still appear</p>
                <button onClick={() => router.push("/verification-success")} className="verifyButton">
                  Verify Token
                </button>
              </>
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
