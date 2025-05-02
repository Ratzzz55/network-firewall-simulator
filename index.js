const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static('public'));

// Middleware to parse incoming JSON
app.use(express.json());

// Basic route to simulate packet filtering
app.post('/packet', (req, res) => {
    const packet = req.body;
    const result = processPacket(packet);
    console.log(`Packet result: ${JSON.stringify(result)}`);
    res.json(result);
});

// Simple packet filtering logic
const blockedIPs = ['192.168.0.1', '10.0.0.2']; 
const allowedPorts = [80, 443];
const allowedProtocols = ['TCP', 'UDP'];

function processPacket(packet) {
    const { ip, port, protocol } = packet;

    if (blockedIPs.includes(ip)) {
        return { allowed: false, reason: 'Blocked IP address' };
    }

    if (!allowedPorts.includes(port)) {
        return { allowed: false, reason: 'Port not allowed' };
    }

    if (!allowedProtocols.includes(protocol)) {
        return { allowed: false, reason: 'Protocol not allowed' };
    }

    return { allowed: true, reason: 'Packet allowed' };
}

app.listen(port, () => {
    console.log(`Firewall simulator running on http://localhost:${port}`);
});
