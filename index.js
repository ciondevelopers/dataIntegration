const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3500;

const VERIFY_TOKEN = "token1122"; // Replace with your actual verification token

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON payloads

// ✅ Webhook Verification (GET request)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook Verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// ✅ Webhook Event Listener (POST request)
app.post("/webhook", (req, res) => {
  console.log("🔔 Received Webhook Event:", JSON.stringify(req.body, null, 2));
  
  // Respond with a 200 status to acknowledge receipt
  res.status(200).send("EVENT_RECEIVED");
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Facebook Webhook is running!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
