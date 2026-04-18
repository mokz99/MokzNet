const express = require('express');
const si = require('systeminformation');
const cors = require('cors');

const app = express();

app.use(cors());

// Disk endpoint (total, used, percent)
app.get('/api/disk', async (req, res) => {
  try {
    const data = await si.fsSize();
    const mainDrive = data[0]; // Get the primary partition

    res.json({
      total: (mainDrive.size / 1024 / 1024 / 1024).toFixed(2),
      used: (mainDrive.used / 1024 / 1024 / 1024).toFixed(2),
      percent: mainDrive.use.toFixed(1)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read Disk space" });
  }
});

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

// CPU endpoint (model, cores, load, temp)
app.get('/api/cpu', async (req, res) => {
  try {
    const cpuInfo = await si.cpu();
    const load = await si.currentLoad();
    const temp = await si.cpuTemperature();

    res.json({
      model: `${cpuInfo.manufacturer} ${cpuInfo.brand}`,
      cores: cpuInfo.cores,
      load: load.currentLoad.toFixed(1), // Total CPU load in %
      temp: temp.main
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read CPU" });
  }
});

// Uptime endpoint (uptime seconds)
app.get('/api/uptime', async (req, res) => {
  try {
    const timeData = await si.time();
    res.json({
      uptime: formatUptime(timeData.uptime)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read uptime" });
  }
});

// Helper function to format seconds into "1d 4h 20m"
function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  result += `${minutes}m`;
  
  return result;
}

// Start server
app.listen(8081, () => {
  console.log('Backend server running on http://localhost:8081');
});
