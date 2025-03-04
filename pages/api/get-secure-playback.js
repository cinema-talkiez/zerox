export default async function handler(req, res) {
    const { streamUrl, token } = req.query;
  
    if (!streamUrl || !token) {
      return res.status(400).json({ error: "Invalid request" });
    }
  
    const secretKey = "zpxocivubyntmrlekwjqhagsfddfsgah";
    const expectedToken = require("crypto").createHmac("sha256", secretKey).update(streamUrl).digest("hex");
  
    if (token !== expectedToken) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
  
    // Redirect to the actual video stream URL
    res.writeHead(302, { Location: streamUrl });
    res.end();
  }
  