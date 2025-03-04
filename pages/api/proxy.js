import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { encoded } = req.query;

    if (!encoded) {
      return res.status(400).json({ error: "No encoded URL provided" });
    }

    // ✅ Decode Base64 URL (Hides actual video URL)
    const targetUrl = Buffer.from(encoded, "base64").toString("utf-8");

    console.log("Proxying request to:", targetUrl);

    // ✅ Ensure URL is valid
    if (!/^https?:\/\//i.test(targetUrl)) {
      return res.status(400).json({ error: "Invalid video URL" });
    }

    
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Range": req.headers.range || "bytes=0-", // ✅ Enable video streaming
        "User-Agent": req.headers["user-agent"] || "Mozilla/5.0", // ✅ Mimic a normal browser
        "Referer": req.headers.referer || targetUrl, // ✅ Pass original `Referer` (or use the video URL itself)
      },
    });
    

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch video: ${response.statusText}`,
      });
    }

    // ✅ Pass headers for streaming support
    res.setHeader("Content-Type", response.headers.get("Content-Type"));
    res.setHeader("Content-Length", response.headers.get("Content-Length"));
    res.setHeader("Accept-Ranges", "bytes");

    // ✅ Stream the video content
    response.body.pipe(res);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
