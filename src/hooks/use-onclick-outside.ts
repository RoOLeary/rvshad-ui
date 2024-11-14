import { useEffect } from 'react';

export function useOnClickOutside<T>(ref:T, handler:T) {
  useEffect(() => {
    const listener = event<T> => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}