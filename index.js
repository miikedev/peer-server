const { ExpressPeerServer } = require("peer");
const express = require("express");
// const https = require("https");
const http = require("http");

// const fs = require("fs");

const app = express();

const server = http.createServer()


// ✅ Set up PeerJS
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/myapp", // Not /myapp (keep this consistent)
});

app.get('/', (req, res) => {
  res.json({ status: "ok" });
});

app.use("/peerjs", peerServer);

// ✅ Run HTTPS server on port 443
server.listen(443, () => {
  console.log("PeerJS server running on port 3000");
});