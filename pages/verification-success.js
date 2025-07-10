import { useEffect } from "react";

export default function VerificationSuccess() {
  useEffect(() => {
    // Set validToken in localStorage
    localStorage.setItem("validToken", "true");

    // Set expiration time for 5 minutes
    const expirationTime = Date.now() + 1*60*60*1000;
    localStorage.setItem("validTokenExpiration", expirationTime.toString());
  }, []);

  // Function to handle exit button click
  const handleExitApp = () => {
    if (window.Android) {
      window.Android.exitApp(); // 🚀 Call native exit function for WebView apps
    } else {
      window.close(); // Attempt to close tab
      setTimeout(() => {
        alert("Unable to close automatically. Please close the tab manually.");
      }, 500);
    }
  };

  return (
    <div className="verification-success">
      <div className="success-container">
        <h1>✅ Verification Successful!</h1>
        <p>Your token is now valid. You can access the content.</p>
        {/*<div className="loader0"></div>*/}
        <p>Click the button below to Exit the app.</p>

        {/* Exit Button */}
        <button className="exit-btn" onClick={handleExitApp}>
          Exit App
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

        .loader0 {
          width: 30px;
          height: 30px;
          border: 3px solid transparent;
          border-top: 3px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .exit-btn {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 18px;
          color: white;
          background-color: red;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        .exit-btn:hover {
          background-color: darkred;
        }
      `}</style>
    </div>
  );
}
