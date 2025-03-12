export default function SharePage() {
  const mediafireLink = "https://www.mediafire.com/file/example.apk";
  const shareMessage = `Download this APK: ${mediafireLink}`;

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

    // ✅ Open in a new tab, ensuring it launches in the user's default browser
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
