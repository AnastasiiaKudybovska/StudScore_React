// // import React, { useState, useEffect } from "react";
// // import "./style.css";

// // const MotivationBlock = () => {
// //   const [flipIndex, setFlipIndex] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setFlipIndex((flipIndex) => (flipIndex + 1) % 3);
// //     }, 2000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const phrases = ["learning", "coding", "creating"];
// //   const currentPhrase = phrases[flipIndex];
// //   const [prevColor, setPrevColor] = useState(null);
// //   const [backColor, setBackColor] = useState('#b7094c');
// //   useEffect(() => {
// //     const colors = ['#b7094c', '#42BFDD', '#2EE59D', '##ffd7ba'];
// //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
// //     setBackColor(randomColor);
// //   }, [currentPhrase]);
// //   return (
// //     <div className="motivation-block-wrap">
// //       <div className="motivation-block">
// //         Always be
// //         <div id="flip">
// //           <div>
// //             <div сlassName="fade-in" style={{ background: backColor }}>{currentPhrase}</div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MotivationBlock;

// import React, { useState, useEffect } from 'react';
// import './style.css';

// const phrases = ['learning', 'coding', 'creating'];
// const colors = ['#b7094c', '#42BFDD', '#2EE59D', '##ffd7ba'];

// const MotivationBlock = () => {
//   const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
//   const [prevColor, setPrevColor] = useState(null);
//   const [currentColor, setCurrentColor] = useState(colors[0]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       let newPhrase = currentPhrase;
//       while (newPhrase === currentPhrase) {
//         newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
//       }
//       setCurrentPhrase(newPhrase);

//       let newColor = currentColor;
//       while (newColor === currentColor || newColor === prevColor) {
//         newColor = colors[Math.floor(Math.random() * colors.length)];
//       }
//       setPrevColor(currentColor);
//       setCurrentColor(newColor);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [currentPhrase, currentColor, prevColor]);

//   const flipStyle = { backgroundColor: currentColor, transform: 'translateY(100%)' };

//   return (
//     <div className="motivation-block-wrap">
//       <div className="motivation-block">
//         Always be
//         <div id="flip">
//           <div>
//             <div className="fade-in" style={flipStyle}>{currentPhrase}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MotivationBlock;
import React, { useState, useEffect } from 'react';
import './style.css';

const MotivationBlock = ({ phrases, initialText }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const colors = ['#b7094c', '#42BFDD', '#2EE59D'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(true);
      setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      setAnimate(false);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPhraseIndex, phrases.length]);

  return (
    <div className='motivation-block-wrap' data-testid="motivation-block">
      <div className={`motivation-block`}>
        {/* ${animate ? 'animate' : ''} */}
        {initialText}
        <div id="flip">
          <div>
            <div style={{ backgroundColor: colors[currentPhraseIndex] }}>{phrases[currentPhraseIndex]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationBlock;
