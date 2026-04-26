import React, { useState, useEffect } from 'react';

const ServerDashboard = () => {
  const [spinIndex, setSpinIndex] = useState(0);
  const chars = ['-', '\\', '|', '/'];

  const [uptimeData, setUptimeData] = useState({ uptime: '...' });
  const [diskData, setDiskData] = useState({ total: '...', used: '...', percent: '...' });
  const [ramData, setRamData] = useState({ total: '...', used: '...', percent: '...' });
  const [cpuData, setCPUData] = useState({ model: '...', cores: '...', load: '...', temp: '...' });

  const loadingStats = {
    ram: { total: '...', used: '...', percent: '...' },
    cpu: { model: '...', cores: '...', load: '...', temp: '...' },
    disk: { total: '...', used: '...', percent: '...' },
    uptime: { uptime: '...' }
  };

  // Effect for spinny thing next to name on first line to make it look more alive
  useEffect(() => {
    const interval = setInterval(() => {
      setSpinIndex((prev) => (prev + 1) % chars.length);
    }, 150); // Change speed here
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const [uptimeRes, diskRes, ramRes, cpuRes] = await Promise.all([
        fetch('https://api.mokz.net/api/uptime'),
        fetch('https://api.mokz.net/api/disk'),
        fetch('https://api.mokz.net/api/ram'),
        fetch('https://api.mokz.net/api/cpu'),
      ]);

      const uptimeJson = await uptimeRes.json();
      const diskJson = await diskRes.json();
      const ramJson = await ramRes.json();
      const cpuJson = await cpuRes.json();

      setUptimeData(uptimeJson);
      setDiskData(diskJson);
      setRamData(ramJson);
      setCPUData(cpuJson);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    // Clear values to give visual feedback that the refresh started
    setUptimeData(loadingStats.uptime);
    setDiskData(loadingStats.disk);
    setRamData(loadingStats.ram);
    setCPUData(loadingStats.cpu);
    fetchStats();
  };

  return (
    <div style={{
      backgroundColor: 'rgb(31, 23, 18)',
      border: '4px solid rgb(49, 46, 44)',
      borderRadius: '5px',
      padding: '15px',
      fontFamily: '"VT323", monospace',
      fontSize: '22px',
      textShadow: 'var(--orange-glow)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px'
      }}>
        {/* Left Side: Username and Spinner */}
        <div>
          <span style={{ color: 'var(--terminal-orange-text)', textShadow: 'var(--orange-glow)' }}>mokz</span>
          <span style={{ color: 'var(--terminal-yellow-text)', textShadow: 'var(--yellow-glow)' }}>@</span>
          <span style={{ color: 'var(--terminal-orange-text)', textShadow: 'var(--orange-glow)' }}>raspberrypi </span>
          <span style={{ color: 'var(--terminal-yellow-text)', textShadow: 'var(--yellow-glow)' }}>[{chars[spinIndex]}]</span>
        </div>

        {/* Right Side: Refresh Button */}
        <button
          onClick={handleRefresh}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid var(--terminal-orange-text)',
            color: 'var(--terminal-orange-text)',
            fontFamily: '"VT323", monospace',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: '3px',
            textShadow: 'var(--orange-glow)',
            boxShadow: '0 0 5px rgba(255, 165, 0, 0.2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--terminal-orange-text)';
            e.target.style.color = 'rgb(31, 23, 18)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'var(--terminal-orange-text)';
          }}
        >
          REFRESH
        </button>
      </div>
      <p style={{ margin: 0 }}>
        <span style={{ color: 'var(--terminal-orange-text)' }}>================</span><br />

        <span style={{ color: 'var(--terminal-orange-text)' }}>OS: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>Raspbian GNU/Linux</span><br />

        <span style={{ color: 'var(--terminal-orange-text)' }}>Uptime: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{uptimeData.uptime}</span><br />

        <span style={{ color: 'var(--terminal-orange-text)' }}>Disk Total: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{diskData.total} GB</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>Disk Used: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{diskData.used} GB</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>Disk Used %: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{diskData.percent}%</span><br />

        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Total: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.total} GB</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Used: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.used} GB</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Used %: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.percent}%</span><br />

        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Model: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.model}</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Cores: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.cores}</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Load: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.load}%</span><br />
        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Temperature: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.temp}°C</span><br />
      </p>
    </div>
  );
};

export default ServerDashboard;