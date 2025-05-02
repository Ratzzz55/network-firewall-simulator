const express = require('express');
const path = require('path');
const app = express();

// Set the port to 3000 if it's available, otherwise fallback to 4000
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Serve static files (index.html, style.css, etc.) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Simulated rule set for firewall
const firewallRules = [
  { ip: "192.168.1.10", port: 22, protocol: "TCP", action: "block" },
  { ip: "10.0.0.5", port: 80, protocol: "TCP", action: "allow" },
  { ip: "192.168.2.5", port: 443, protocol: "TCP", action: "block" }
];

// POST route to simulate packet checking
app.post('/test-traffic', (req, res) => {
  const { ip, port, protocol } = req.body;
  const rule = firewallRules.find(rule => rule.ip === ip && rule.port === port && rule.protocol === protocol);

  if (rule) {
    if (rule.action === 'block') {
      return res.json({ message: '🚫 Access Blocked by Firewall' });
    } else {
      return res.json({ message: '✅ Access Allowed' });
    }
  } else {
    return res.json({ message: '✅ No firewall rule matched, traffic allowed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
