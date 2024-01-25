import React, { useState, useEffect } from 'react';

const Overlay = ({ show, duration, children }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    let timer;
    if (show) {
      setVisible(true);
    } else {
      timer = setTimeout(() => setVisible(false), duration);
    }
    return () => clearTimeout(timer);
  }, [show, duration]);

  return visible ? (
    <div className={`shutter-overlay${show ? '' : ' fade-out'}`}>
      {children}
    </div>
  ) : null;
};

export default Overlay;
