import crypto from "crypto";

const secretKey = "zpxocivubyntmrlekwjqhagsfddfsgah"; // Must match encryption key

export default async function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    // Extract IV and encrypted text
    const [ivHex, encryptedText] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(secretKey), iv);

    // Decrypt the URL
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    res.status(200).json({ videoUrl: decrypted });
  } catch (error) {
    console.error("Decryption error:", error);
    return res.status(403).json({ error: "Unauthorized access" });
  }
}
