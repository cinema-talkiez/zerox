import React from "react";

const SharePage = () => {
  const handleShare = () => {
    const mediafireLink = "https://www.mediafire.com/file/example.apk"; 
    const shareMessage = `Download this APK: ${mediafireLink}`;

    // ✅ Check if running inside an Android WebView
    const isAndroidWebView = navigator.userAgent.includes("wv");

    if (navigator.share && !isAndroidWebView) {
      // ✅ Use native Web Share API (Only works in normal browsers)
      navigator.share({
        title: "Download APK",
        text: shareMessage,
        url: mediafireLink,
      })
      .then(() => {
        localStorage.setItem("validToken", "true"); // ✅ Set token after successful share
        alert("Shared successfully! Token set.");
      })
      .catch((error) => console.error("Sharing failed", error));
    } else if (window.Android) {
      // ✅ WebView: Use Android Interface for Sharing
      window.Android.share(shareMessage);
    } else {
      // ✅ Open WhatsApp as a fallback
      const encodedMessage = encodeURIComponent(shareMessage);
      window.location.href = `https://wa.me/?text=${encodedMessage}`;
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

export default SharePage;
