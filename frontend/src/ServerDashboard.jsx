import React, { useState, useEffect } from 'react';

const ServerDashboard = () => {
  const [ramData, setRamData] = useState({ total: '...', used: '...', percent: '...' });

  useEffect(() => {
    fetch('https://api.mokz.net/api/ram')
      .then((res) => res.json())
      .then((data) => setRamData(data))
      .catch((err) => console.error("Fetch error:", err));
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
        <span style={{ color: 'var(--terminal-orange-text)' }}>OS : </span><span style={{ color: 'var(--terminal-yellow-text)' }}>Raspbian GNU/Linux</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Total : </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.total} GB</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Used : </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.used} GB</span><br/>
        <span style={{ color: 'var(--terminal-orange-text)' }}>Memory Used % : </span><span style={{ color: 'var(--terminal-yellow-text)' }}>{ramData.percent}%</span>
      </p>
    </div>
  );
};

export default ServerDashboard;