import crypto from "crypto";

const secretKey = "zpxocivubyntmrlekwjqhagsfddfsgah"; // Must be 32 characters for AES-256
const iv = crypto.randomBytes(16); // Random IV for encryption

export default async function handler(req, res) {
  const { streamUrl } = req.query;

  if (!streamUrl) {
    return res.status(400).json({ error: "Missing stream URL" });
  }

  // Encrypt the URL using AES-256
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secretKey), iv);
  let encrypted = cipher.update(streamUrl, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Encode IV with encrypted URL
  const encryptedData = `${iv.toString("hex")}:${encrypted}`;

  // Instead of redirecting, return a secure player page
  const securePlaybackPage = `/secureplayer?data=${encodeURIComponent(encryptedData)}`;

  res.status(200).json({ secure_stream: securePlaybackPage });
}
