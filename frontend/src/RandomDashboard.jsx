import React, { useState, useEffect } from 'react';

import randomCow from './assets/mokznet_random_cow_1.gif'
import peanutButterJellyTime from './assets/peanutbutterjellytime.gif'
import dragonKnight from './assets/dragon_knight_art.gif'

const RandomDashboard = () => {
  const images = [randomCow, peanutButterJellyTime, dragonKnight];
  const [currentIdx, setCurrentIdx] = useState(0);

  const showNewImage = () => {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * images.length);
    } while (newIdx === currentIdx); // Keep picking until it's a different one

    setCurrentIdx(newIdx);
  };

  return (
    <div style={{
      width: '100%',
      height: '11.5em',
      position: 'relative', // 1. Set this so the button knows where to stay
      backgroundColor: 'rgb(0, 0, 0)',
      border: '4px solid rgb(49, 46, 44)',
      borderRadius: '5px',
      padding: '0px',
      fontFamily: '"VT323", monospace',
      fontSize: '22px',
      textShadow: '0 0 20px rgba(255, 165, 0, 0.3)',
      display: 'inline-block', // Keeps the div the size of the image
      overflow: 'hidden',      // Keeps the image from spilling out of corners
    }}>
      <button
        onClick={showNewImage}
        style={{
          position: 'absolute',  // 2. Lift it off the page so it floats
          top: '10px',           // 3. Anchor it to the top
          left: '10px',          // 4. Anchor it to the left
          zIndex: 1,             // 5. Ensure it stays above the image
          cursor: 'pointer',
          fontSize: 20,
          borderRadius: 4,
          borderColor: 'white',
          backgroundColor: 'rgb(43, 63, 179)',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgb(10, 16, 54)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgb(43, 63, 179)';
        }}>
        🪄✨
      </button>

      <img
        src={images[currentIdx]}
        alt="Animated Masterpiece"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain', // 1. Shows the whole image, no zooming
          backgroundColor: 'black', // 2. Fills the "empty" sides with black
          display: 'block'
        }}
      />
    </div>
  );
};

export default RandomDashboard;