import { useState, useEffect, useMemo } from 'react';

export interface ProgressOptions {
  valuePerTick: {
    min: number;
    max: number;
  };
  tickDelay: {
    min: number;
    max: number;
  };
}

export function useProgress(options: ProgressOptions) {
  const [show, setShow] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [value, setValue] = useState(0);
  let timeoutHolder = useMemo<NodeJS.Timeout>(() => null, []);

  const animateProgress = (inputValue?: number) => {
    let maxAllowed = 96;
    let tickMin = (inputValue || value) + options.valuePerTick.min;
    let tickMax = (inputValue || value) + options.valuePerTick.max;
    let newValue = Math.random() * (tickMax - tickMin) + tickMin;
    if (newValue > maxAllowed) {
      newValue = maxAllowed;
    }
    setValue(newValue);
  };

  const animateDone = () => {
    if (timeoutHolder) clearTimeout(timeoutHolder);
    setDone(true);
    setValue(100);
    setStarted(false);
    setTimeout(() => {
      setDone(false);
      setShow(false);
    }, 1000);
  };

  useEffect(() => {
    let { max, min } = options.tickDelay;
    let delay = Math.random() * (max - min) + min;
    timeoutHolder = setTimeout(() => {
      if (started && !done && value !== 100) {
        animateProgress();
      }
    }, delay);
  }, [value]);
  return {
    start: () => {
      animateProgress(1);
      setStarted(true);
      setShow(true);
    },
    done: () => animateDone(),
    value,
    started,
    show
  };
}
