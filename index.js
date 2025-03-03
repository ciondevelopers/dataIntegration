const express = require("express");
const app = express();
const cors = require("cors");
const port = 3500;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON payloads

const VERIFY_TOKEN = "token1122"; // Replace "your_verify_token" with your actual verification token

// Handle GET request to verify the webhook
app.get("/webhook", function (req, res) {
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (token === VERIFY_TOKEN) {
    res.status(200).send(challenge); // Respond with the challenge value
  } else {
    res.sendStatus(403); // Forbidden if token doesn't match
  }
});

// Handle POST request to receive data
app.post("/webhook", (req, res) => {
  // Log the incoming request body (useful for debugging)
  console.log("Received webhook:", req.body);

  // Respond with a success message
  res.send("Hello World");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
