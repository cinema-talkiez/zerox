import { useEffect } from "react";

const handleShare = () => {
  const mediafireLink = "https://www.mediafire.com/file/example.apk";
  const shareMessage = `Download this APK: ${mediafireLink}`;

  if (typeof window !== "undefined") {
    const isAndroidWebView = window.Android !== undefined;

    if (navigator.share && !isAndroidWebView) {
      navigator
        .share({
          title: "Download APK",
          text: shareMessage,
          url: mediafireLink,
        })
        .then(() => {
          localStorage.setItem("validToken", "true");
          alert("Shared successfully! Token set.");
        })
        .catch((error) => console.error("Sharing failed", error));
    } else if (window.Android) {
      window.Android.share(shareMessage);
      localStorage.setItem("validToken", "true");
    } else {
      const encodedMessage = encodeURIComponent(shareMessage);
      window.location.href = `https://wa.me/?text=${encodedMessage}`;
    }
  }
};

export default function SharePage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const shareButton = document.getElementById("shareButton");
      if (shareButton) {
        shareButton.addEventListener("click", handleShare);
      }
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Share APK</h1>
      <p>Click the button below to share the APK:</p>
      <button id="shareButton" style={{ padding: "10px 20px", fontSize: "16px" }}>
        Share APK
      </button>
    </div>
  );
}
