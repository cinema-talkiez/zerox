export default function SharePage() {
  const mediafireLink = "https://www.mediafire.com/file/example.apk";
  const shareMessage = `Download this APK: ${mediafireLink}`;
  
  const handleWhatsAppShare = () => {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;

    // ✅ Create a hidden link to trigger WhatsApp
    const link = document.createElement("a");
    link.href = whatsappUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
