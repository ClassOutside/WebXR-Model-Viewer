const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const ModelController = require("./controllers/ModelController");
const FolderController = require("./controllers/FolderController");
const config = require("./appConfig");

const app = express();

// Load SSL certificate and key
const options = {
  key: fs.readFileSync("./keys/key.pem"),
  cert: fs.readFileSync("./keys/cert.pem"),
};

// Load configuration from appConfig.json
const PORT = config.PORT || 3001; // Default to 3001 if not set in config

// Enable CORS for all routes
app.use(cors());

// Use the routes defined in ModelController and FolderController
app.use("/models", ModelController.getRoutes());
app.use("/folders", FolderController.getRoutes());

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${config.PORT}`);
});
