import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SecurePlayer = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    let storedData = router.query.data;

    // ✅ Retrieve `data` from `sessionStorage` if missing after refresh
    if (!storedData) {
      storedData = sessionStorage.getItem("secureData");
    } else {
      sessionStorage.setItem("secureData", storedData);
    }

    if (storedData) {
      fetch(`/api/decrypt-url?data=${encodeURIComponent(storedData)}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.videoUrl) {
            // ✅ Convert video URL to Base64 and use Proxy API
            const encodedUrl = btoa(response.videoUrl);
            setVideoUrl(`/api/proxy?encoded=${encodedUrl}`);

            // ✅ Hide the URL from the address bar
            window.history.replaceState(null, "", "/secureplayer");
          } else {
            console.error("Failed to decrypt URL");
          }
        })
        .catch((error) => {
          console.error("Error fetching video URL:", error);
        });
    } else {
      console.error("No secure data found.");
    }
  }, [router.query.data]);

  // ✅ Auto Redirect When DevTools is Opened (No Popup)
  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        router.back(); // ✅ Automatically go back
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    return () => clearInterval(interval);
  }, [router]);

  // ✅ Disable Right-Click, Inspect Element, and Keyboard Shortcuts
  useEffect(() => {
    const disableInspect = (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
        router.back(); // ✅ Automatically go back
      }
    };

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      router.back(); // ✅ Go back when right-click is used
    });

    document.addEventListener("keydown", disableInspect);

    return () => {
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
      document.removeEventListener("keydown", disableInspect);
    };
  }, [router]);

  return (
    <div style={styles.container}>
      {videoUrl ? (
        <iframe
          src={videoUrl}
          style={styles.iframe}
          allowFullScreen
          allow="autoplay"
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

// ✅ Prevent scrolling & make player fullscreen
const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  iframe: {
    width: "100vw",
    height: "100vh",
    border: "none",
  },
};

export default SecurePlayer;
