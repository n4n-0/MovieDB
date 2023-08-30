import { useEffect, useRef } from 'react';

export const useHorizontalScroll = () => {
  const elementRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 8, 
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  return elementRef;
};
