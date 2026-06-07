const express = require('express');
const si = require('systeminformation');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, 'mokznet.db'));

const app = express();

app.use(cors());

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

// Helper method to store image files for guest book
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'guestbook_avatar_images/'); 
  },
  filename: (req, file, cb) => {
    const rawUsername = req.body.username || 'anonymous';
    
    //clean username. no hacking allowed! only letters/numbers are permitted.
    let cleanUsername = rawUsername
      .toLowerCase()
      .replace(/\s+/g, '-') 
      .replace(/[^a-z0-9_-]/g, '');

    //If the user used ONLY emojis/special chars, cleanUsername becomes empty and we call him guest.
    if (!cleanUsername || cleanUsername === '-') {
      cleanUsername = 'guest';
    }

    //prevent too long file names.
    cleanUsername = cleanUsername.substring(0, 30);

    const timestamp = Date.now();
    const ext = path.extname(file.originalname);

    //Example output: "hacker-man_1717800000000.png"
    const uniqueFilename = `${cleanUsername}_${timestamp}${ext}`;
    
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

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

app.post('/api/guestbook/entries', upload.single('avatar'), (req, res) => {
  try {
    const { username, message } = req.body;
    
    //validation to make sure fields arent blank
    if (!username || !username.trim() || !message || !message.trim()) {
      return res.status(400).json({ error: 'Username and message are required.' });
    }

    //Set filename based on value genereted by Multer via the multer.diskStorage configuration
    //If the user didn't draw an avatar, we default it to null.
    const avatar_filename = req.file ? req.file.filename : null;

    const stmt = db.prepare(`
      INSERT INTO guestbook (username, message, avatar_filename)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(username, message, avatar_filename);

    return res.status(201).json({
      success: true,
      message: 'Guestbook entry created successfully!',
      entryId: result.lastInsertRowid
    });

  } catch (error) {
    console.error('Error creating guestbook entry:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// exaple query values: ?page=3&limit=15
app.get('/api/guestbook/entries', (req, res) => {
  try {
    //In case page/limit is not set then, page 1 as default and get 10 posts as default.
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    //offset of posts to get based on what page we are on and post limit to get.
    const offset = (page - 1) * limit;

    //Query the database for ACTIVE (unhidden) entries, sorted by newest first.
    const entriesStmt = db.prepare(`
      SELECT id, username, message, avatar_filename, created_at 
      FROM guestbook 
      WHERE is_hidden = 0 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);
    const entries = entriesStmt.all(limit, offset);

    //Get the total count of unhidden posts. This is used for the frontend to know how many pages will exist.
    const countStmt = db.prepare(`
      SELECT COUNT(*) AS total 
      FROM guestbook 
      WHERE is_hidden = 0
    `);
    const totalEntries = countStmt.get().total;
    
    const totalPages = Math.ceil(totalEntries / limit);

    return res.status(200).json({
      metadata: {
        totalEntries: totalEntries,
        totalPages: totalPages,
        currentPage: page,
        perPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      data: entries
    });

  } catch (error) {
    console.error('Error fetching guestbook entries:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(8081, () => {
  console.log('Backend server running on http://localhost:8081');
});
