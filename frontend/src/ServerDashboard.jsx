import React, { useState, useEffect } from 'react';

const ServerDashboard = () => {
  const [diskData, setDiskData] = useState({ total: '...', used: '...', percent: '...' });
  const [ramData, setRamData] = useState({ total: '...', used: '...', percent: '...' });
  const [cpuData, setCPUData] = useState({ model: '...', cores: '...', load: '...', temp: '...' });

  useEffect(() => {
  const fetchStats = async () => {
      try {
        // 1. Fire all three requests in parallel
        const [diskRes, ramRes, cpuRes] = await Promise.all([
            fetch('https://api.mokz.net/api/disk'),
            fetch('https://api.mokz.net/api/ram'),
            fetch('https://api.mokz.net/api/cpu'),
        ]);  
        const diskJson = await diskRes.json();  
        const ramJson = await ramRes.json();
        const cpuJson = await cpuRes.json();
        setDiskData(diskJson);
        setRamData(ramJson);
        setCPUData(cpuJson);
      } catch (err) {
        console.error("Fetch error:", err);
      }
  };

  fetchStats();
  }, []);

  return (
    <div style={{ 
      backgroundColor: 'rgb(31, 23, 18)',
      border: '4px solid rgb(49, 46, 44)',
      borderRadius: '5px',
      padding: '15px',
      fontFamily: '"VT323", monospace', 
      fontSize: '22px', 
    }}>
      <p style={{ margin: 0}}>
        <span style={{ color: 'var(--terminal-orange-text)' }}>mokz</span>
        <span style={{ color: 'var(--terminal-yellow-text)' }}>@</span>
        <span style={{ color: 'var(--terminal-orange-text)' }}>raspberrypi</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>----------------</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>OS: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>Raspbian GNU/Linux</span><br/>

        <span style={{ color: 'var(--terminal-orange-text)' }}>Disk Total: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{diskData.total} GB</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Disk Used: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{diskData.used} GB</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Disk Used %: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{diskData.percent}%</span><br/>

        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Total: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.total} GB</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Used: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.used} GB</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Used %: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.percent}%</span><br/>

        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Model: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.model}</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Cores: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.cores}</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Load: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.load}%</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>CPU Temperature: </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{cpuData.temp}°C</span><br/>
      </p>
    </div>
  );
};

export default ServerDashboard;