const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const app = express();
const PORT = 3001; // Run proxy on a different port

app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  request(targetUrl, (error, response, body) => {
    if (error) return res.status(500).send("Error fetching the page");

    // Load HTML into Cheerio
    const $ = cheerio.load(body);

    // Remove common ad-related elements
    $('script[src*="ads"], iframe[src*="ads"], div[class*="ad"], .sponsored, .advertisement').remove();

    // Send modified HTML
    res.send($.html());
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Proxy running on http://localhost:${PORT}`));
