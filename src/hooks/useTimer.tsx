import React, { useEffect, useState } from "react";

const useTimer = (time: number, onSkip: (time: number) => void, id: string) => {
  const [timer, setTimer] = useState(0);

  function getTime() {
    return timer;
  }

  useEffect(() => {
    const ref = setInterval(() => {
      if (timer >= time) {
        clearInterval(ref);
        onSkip(timer);
        return;
      }
      setTimer((prevState) => prevState + 1);
    }, 1000);
    return () => {
      clearInterval(ref);
    };
  }, [timer, time, onSkip]);

  useEffect(() => {
    setTimer(0);
  }, [id]);

  return getTime;
};

export default useTimer;
