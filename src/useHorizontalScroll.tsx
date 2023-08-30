// src/useHorizontalScroll.ts
import { useEffect, useRef } from 'react';

export const useHorizontalScroll = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 8, // Adjust multiplier for greater scroll distance
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  return elementRef;
};
