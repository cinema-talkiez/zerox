import React from "react";

const Index = () => {
  const mediafireLink = "https://www.mediafire.com/file/example.apk"; // Replace with your actual APK link

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Download APK",
          text: "Get this APK now!",
          url: mediafireLink,
        });

        // ✅ Share successful, set validToken to true
        localStorage.setItem("validToken", "true");
        alert("Shared successfully! Token set.");
      } catch (error) {
        console.error("Sharing failed", error);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={handleShare}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Share APK
      </button>
    </div>
  );
};

export default Index;
