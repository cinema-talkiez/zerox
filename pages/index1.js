import React from "react";

const Index1 = () => {
  const handleRedirect1 = () => {
    window.location.href = "https://esa.ibomma.day/"; // Change this to your first URL
  };

  const handleRedirect2 = () => {
    window.location.href = "https://www.google.com/"; // Change this to your second URL
  };

  const handleRedirect3 = () => {
    window.location.href = "https://www.moviezwap.dad/"; // Change this to your third URL
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "20px" }}>
      <button onClick={handleRedirect1} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Go to ESA Ibomma
      </button>
      <button onClick={handleRedirect2} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Go to Google
      </button>
      <button onClick={handleRedirect3} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Go to Moviezwap
      </button>
    </div>
  );
};

export default Index1;
