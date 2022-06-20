import { useCallback, useEffect } from "react";

interface KeyboardEvent {
  key: string;
  keyCode: number;
}

const useKeyboardKey = (onKeyPress: (key: string) => void) => {
  const clickFunction = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.keyCode === 32) {
        onKeyPress("SPACE");
        return;
      }
      onKeyPress(ev.key);
    },
    [onKeyPress]
  );

  useEffect(() => {
    window.addEventListener("keydown", clickFunction);

    return () => {
      window.removeEventListener("keydown", clickFunction);
    };
  }, [clickFunction]);
};

export default useKeyboardKey;
