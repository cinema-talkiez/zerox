import { useEffect } from "react";

export default function VerificationSuccess() {
  useEffect(() => {
    // Set validToken in localStorage
    localStorage.setItem("validToken", "true");

    // Set expiration time for 5 minutes
    const expirationTime = Date.now() + 10 * 60 * 1000;
    localStorage.setItem("validTokenExpiration", expirationTime.toString());
  }, []);

  // Function to restart the app
  const handleRestartApp = () => {
    if (window.Android) {
      window.Android.restartApp(); // 🚀 Calls restart function in WebView
    } else {
      alert("Restart not supported in browser. Please reopen the tab.");
    }
  };

  return (
    <div className="verification-success">
      <div className="success-container">
        <h1>✅ Verification Successful!</h1>
        <p>Your token is now valid. You can access the content.</p>
        <p>Click the button below to Restart the app.</p>

        {/* Restart Button */}
        <button className="exit-btn" onClick={handleRestartApp}>
          Restart App
        </button>
      </div>

      {/* Embedded Styles */}
      <style jsx>{`
        .verification-success {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #121212;
          color: #fff;
          text-align: center;
        }

        .success-container {
          background: #1e1e1e;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
          max-width: 400px;
          width: 90%;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #4CAF50;
        }

        p {
          font-size: 16px;
          opacity: 0.9;
        }

        .exit-btn {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 18px;
          color: white;
          background-color: blue;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        .exit-btn:hover {
          background-color: darkblue;
        }
      `}</style>
    </div>
  );
}
