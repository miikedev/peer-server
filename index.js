const { ExpressPeerServer } = require("peer");
const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();


const server = https.createServer({
  key: fs.readFileSync("/etc/letsencrypt/live/yourdomain.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/yourdomain.com/fullchain.pem"),
}, app);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/myapp",
});

app.get('/', (req,res) => {
    res.json({
        status: "ok"
    })
})

app.use("/peerjs", peerServer);

// Start on port 443 (for HTTPS) or 3000 (for HTTP testing)
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`PeerJS server running on port ${port}`);
});