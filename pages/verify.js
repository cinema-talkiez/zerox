import { FcApproval } from "react-icons/fc";
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for CSS
const GlassmorphismPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6; /* bg-gray-100 */
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  max-width: 28rem;
  width: 100%;
`;

const TimeoutText = styled.h1`
  color: #ef4444; /* text-red-500 */
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
`;

const Error = styled.p`
  color: #dc2626; /* text-red-600 */
  margin-top: 0.5rem;
`;

const VerifyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4f46e5; /* bg-indigo-600 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
  &:hover {
    background-color: #4338ca; /* hover:bg-indigo-700 */
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const Icon = styled(FcApproval)`
  margin-right: 0.5rem;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
`;

const ContinueButton = styled.button`
  background-color: #4f46e5; /* bg-indigo-600 */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #4338ca; /* hover:bg-indigo-700 */
  }
`;

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Adsterra direct link
  const adsterraUrl = "https://www.profitableratecpm.com/zashzvy33z?key=a6d934ddf20a311b77e2751a70acb953";

  // Handle verification on button click
  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");
    setShowPopup(true); // Show popup immediately

    try {
      console.log("Opening Adsterra URL:", adsterraUrl);

      // Open the Adsterra URL in a new tab
      window.open(adsterraUrl, "_blank");
    } catch (error) {
      console.error("Error during verification:", error);
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
      setShowPopup(false); // Hide popup on error
    }
  };

  // Handle continue button click in popup
  const handleContinue = () => {
    setShowPopup(false);
    setIsVerifying(false);
    // Redirect to verification-success route
    window.location.href = "/verification-success";
    console.log("Redirecting to /verification-success");
  };

  return (
    <GlassmorphismPage>
      <Container>
        <h2>Verify Your Access</h2>
        <p>Click the button below to open the verification ad in a new tab. Keep the ad tab open to complete verification.</p>
        <TimeoutText>Access Timeout: 24hrs</TimeoutText>

        {errorMessage && <Error>{errorMessage}</Error>}

        <VerifyButton onClick={handleVerification} disabled={isVerifying}>
          <Icon />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </VerifyButton>
        
        <p>After verification, follow the instructions in the app to continue...</p>
      </Container>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <h3>Verification In Progress</h3>
            <p>Please keep the ad tab open to complete the verification process, then click Continue.</p>
            <ContinueButton onClick={handleContinue}>
              Continue
            </ContinueButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </GlassmorphismPage>
  );
}
