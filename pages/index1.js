import React from "react";

const Index1 = () => {
  const handleRedirect = () => {
    window.location.href = "https://www.5movierulz.tel"; // Change this to your desired URL
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <button onClick={handleRedirect} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Go to Website
      </button>
    </div>
  );
};

export default Index1;
