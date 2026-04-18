const express = require('express');
const si = require('systeminformation');
const cors = require('cors');

const app = express();

app.use(cors());

// Ram endpoint (total, used, percent)
app.get('/api/ram', async (req, res) => {
  try {
    const data = await si.mem();

    // Convert bytes to GB for easy reading
    res.json({
      total: (data.total / 1024 / 1024 / 1024).toFixed(2),
      used: (data.used / 1024 / 1024 / 1024).toFixed(2),
      percent: ((data.used / data.total) * 100).toFixed(1)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read hardware" });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
