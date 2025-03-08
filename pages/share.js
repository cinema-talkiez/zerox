export default function SharePage() {
  const mediafireLink = "https://www.mediafire.com/file/example.apk";
  const shareMessage = `Download this APK: ${mediafireLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Share APK</h1>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Share on WhatsApp
        </button>
      </a>
    </div>
  );
}
