const handleShare = () => {
  const mediafireLink = "https://www.mediafire.com/file/example.apk"; 
  const shareMessage = `Download this APK: ${mediafireLink}`;

  // ✅ Check if running inside an Android WebView
  const isAndroidWebView = window.Android !== undefined;

  if (navigator.share && !isAndroidWebView) {
    // ✅ Use Web Share API (Only in browsers)
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
    localStorage.setItem("validToken", "true"); // ✅ Set token after successful share
  } else {
    // ✅ Fallback: Open WhatsApp sharing as a last resort
    const encodedMessage = encodeURIComponent(shareMessage);
    window.location.href = `https://wa.me/?text=${encodedMessage}`;
  }
};

// ✅ Attach event listener to the share button
document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("shareButton");
  if (shareButton) {
    shareButton.addEventListener("click", handleShare);
  }
});
