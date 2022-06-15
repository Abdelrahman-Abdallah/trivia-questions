import { FC, useEffect, useState } from "react";

interface KeyboardEvent {
  key: string;
  keyCode: number;
}

const useKeyboardKey = (onKeyPress: (key: string) => void) => {
  const [keyPressed, setKeyPressed] = useState<string>("");

  useEffect(() => {
    const clickFunction = (ev: KeyboardEvent) => {
      console.log(ev);

      if (ev.keyCode === 32) {
        setKeyPressed("SPACE");
        onKeyPress("SPACE");
        return;
      }
      setKeyPressed(ev.key);
      onKeyPress(ev.key);
    };
    window.addEventListener("keydown", clickFunction);

    return () => {
      window.removeEventListener("keydown", clickFunction);
    };
  }, [onKeyPress]);

  return keyPressed;
};

export default useKeyboardKey;
