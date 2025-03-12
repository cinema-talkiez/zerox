export default function SharePage() {
  const mediafireLink = "https://www.mediafire.com/file/example.apk";
  const shareMessage = `Download this APK: ${mediafireLink}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  const handleWhatsAppShare = () => {
    window.location.href = whatsappUrl; // ✅ Directly opens WhatsApp in WebView & browser
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Share APK</h1>
      <button 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
        onClick={handleWhatsAppShare}
      >
        Share on WhatsApp
      </button>
    </div>
  );
}
