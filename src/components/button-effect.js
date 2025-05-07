// src/components/button-effect.js
import React from 'react';
import './components/button-effect.scss'; // Ensure this is importing the SCSS file

const ButtonEffect = () => {
  return (
    <div className="button-container">
      <button className="button-inner">
        <span className="t">Click Me</span>
      </button>
    </div>
  );
}

export default ButtonEffect;
