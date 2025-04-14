import { useState, useEffect } from 'react';

export default function RainBackground() {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    '--c': '#09f',
    backgroundColor: '#000',
    backgroundImage: `
      radial-gradient(4px 100px at 0px 235px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 235px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 117.5px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 252px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 252px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 126px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 150px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 150px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 75px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 253px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 253px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 126.5px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 204px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 204px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 102px, var(--c) 100%, #0000 150%)
    `,
    backgroundSize: `
      300px 235px,
      300px 235px,
      300px 235px,
      300px 252px,
      300px 252px,
      300px 252px,
      300px 150px,
      300px 150px,
      300px 150px,
      300px 253px,
      300px 253px,
      300px 253px,
      300px 204px,
      300px 204px,
      300px 204px
    `,
    animation: 'hi 150s linear infinite'
  };

  const overlayStyle = {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    backgroundImage: 'radial-gradient(circle at 50% 50%, #0000 0, #0000 2px, hsl(0, 0%, 4%) 2px)',
    backgroundSize: '8px 8px',
    animation: 'hii 10s linear infinite'
  };

  return (
    <div className="rain-background-wrapper" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <style>
        {`
          @keyframes hi {
            0% {
              background-position:
                0px 220px,
                3px 220px,
                151.5px 337.5px,
                25px 24px,
                28px 24px,
                176.5px 150px,
                50px 16px,
                53px 16px,
                201.5px 91px,
                75px 224px,
                78px 224px,
                226.5px 350.5px,
                100px 19px,
                103px 19px,
                251.5px 121px;
            }
            to {
              background-position:
                0px 6800px,
                3px 6800px,
                151.5px 6917.5px,
                25px 13632px,
                28px 13632px,
                176.5px 13758px,
                50px 5416px,
                53px 5416px,
                201.5px 5491px,
                75px 17175px,
                78px 17175px,
                226.5px 17301.5px,
                100px 5119px,
                103px 5119px,
                251.5px 5221px;
            }
          }
          
          @keyframes hii {
            0% {
              backdrop-filter: blur(1em) brightness(6) hue-rotate(0deg);
            }
            to {
              backdrop-filter: blur(1em) brightness(6) hue-rotate(360deg);
            }
          }
          
          .rain-container::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 1;
            background-image: radial-gradient(circle at 50% 50%, #0000 0, #0000 2px, hsl(0, 0%, 4%) 2px);
            background-size: 8px 8px;
            animation: hii 10s linear infinite;
          }
        `}
      </style>
      
      <div className="rain-container" style={containerStyle}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: 'radial-gradient(circle at 50% 50%, #0000 0, #0000 2px, hsl(0, 0%, 4%) 2px)', backgroundSize: '8px 8px' }}></div>
      </div>
    </div>
  );
}