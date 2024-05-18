//Custom hook for 'enter' pressing when adding or editing new domain

import { useEffect, useRef } from 'react';

const useKeyPress = (targetKey: string, handleSearchSubmit: ()=> void) => {
  // ref to be passed to the input component
  const ref  = useRef<HTMLInputElement>(null);

  // Function to handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      handleSearchSubmit();
      ref.current?.blur();
    }
  };

  // Cleanup function to remove event listener on unmount
  useEffect(() => {
    window.document.addEventListener('keydown', handleKeyDown, false);
    return () => window.document.removeEventListener('keydown', handleKeyDown, false);
  });

  return ref;
};

export default useKeyPress;