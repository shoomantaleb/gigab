import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize([window.innerWidth, window.innerHeight]);
    }, 100); // Debounce with a 100ms delay

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Debounce function
function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default useWindowSize;