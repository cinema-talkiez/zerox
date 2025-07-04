
import { FcApproval } from "react-icons/fc";
import React, { useState } from 'react';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch the main URL
  const fetchMainUrl = async () => {
    const apiUrl = "https://server-v1-vyzf4.onrender.com/api/url/retrieve";
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.json();
      console.log("API Response:", result);  // Log the entire response

      // Check for the `url` field
      if (result?.url) {
        return result.url;  // Return the URL from the `url` field
      } else {
        throw new Error("URL not found in response.");
      }
    } catch (error) {
      console.error("Error fetching main URL:", error);
      throw error;
    }
  };

  // Function to generate GPLinks shortened URL
  const generateGpLinksShortenedUrl = async (mainUrl) => {
    const apiToken = "e5bf7301b4ad442d45481de99fd656a182ec6507";  // Your GPLinks API token
    const callbackUrl = `${mainUrl}/verification-success/`;  // Append '/verification-success/'
    const apiUrl = `https://api.gplinks.com/api?api=${apiToken}&url=${encodeURIComponent(callbackUrl)}&format=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.json();
      console.log("GPLinks API Response:", result);  // Log the entire response

      // If the response contains a shortened URL, return it
      if (result.status === "success" && result.shortenedUrl) {
        return result.shortenedUrl;
      } else {
        throw new Error(result.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Error generating shortened URL:", error);
      throw error;
    }
  };

  // Handle verification on button click
  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");

    try {
      const mainUrl = await fetchMainUrl();  // Get the main URL

      // Generate shortened URL using GPLinks
      const shortenedUrl = await generateGpLinksShortenedUrl(mainUrl);

      console.log("Shortened URL:", shortenedUrl);  // Log the shortened URL

      // Open the shortened URL in a new tab
      window.open(shortenedUrl, "_blank");
      
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>
        <h1 className="timeoutText">Access Timeout: 24hrs</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button onClick={handleVerification} disabled={isVerifying} className="verifyButton1">
          <FcApproval className="icon1" />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>
        
        <p>After verification, you will automatically redirect...</p>
      </div>
    </div>
  );
}
