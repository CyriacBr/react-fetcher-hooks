import { useState, useEffect, useRef, useMemo } from "react";
import { ProgressOptions } from "../components/Fetcher";

function waitDelay(value: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, value);
  });
}

export function useProgress(options: ProgressOptions) {
  const [show, setShow] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(true);
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>();

  const nextTick = (inputValue?: number) => {
    let maxAllowed = 96;
    setValue(prevValue => {
      if (prevValue >= 100) {
        return 100;
      }
      if (!started) {
        return prevValue;
      }
      let tickMin = (inputValue || prevValue) + options.valuePerTick.min;
      let tickMax = (inputValue || prevValue) + options.valuePerTick.max;
      let newValue = Math.random() * (tickMax - tickMin) + tickMin;
      if (done) {
        return 100;
      }
      if (newValue > maxAllowed) {
        return maxAllowed;
      }
      return newValue;
    });
  };

  const animateDone = () => {
    setValue(100);
    setTimeout(() => {
      if (!started) {
        setDone(false);
        setShow(false);
      }
    }, 500);
  };

  const animate = async () => {
    let { max, min } = options.tickDelay;
    nextTick();
    let delay = Math.random() * (max - min) + min;
    await waitDelay(delay);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (done) {
      animateDone();
    }
    requestAnimationFrame(animate);
  }, [started, done]);

  useEffect(() => {
    let el = ref.current;
    if (el) {
      const current = parseFloat(el.style.width);
      el.style.transitionProperty = current > value ? "none" : "all";
      el.style.width = `${value}%`;
    }
  }, [value]);

  return {
    start: () => {
      setValue(0);
      setStarted(true);
      setShow(true);
      setDone(false);
    },
    done: () => {
      setStarted(false);
      setDone(true);
    },
    value,
    started,
    show,
    ref
  };
}
