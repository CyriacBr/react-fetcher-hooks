import React, { MutableRefObject, forwardRef, useEffect } from 'react';

export interface ProgressProps {
  color?: string;
  ref: MutableRefObject<HTMLDivElement>;
}

//@ts-ignore
const Progress: React.FC<ProgressProps> = forwardRef(({ color }: ProgressProps, ref) => {
  const barStyle = {
    // transform: `translate3d(-${100 - value}%, 0px, 0px)`,
    background: color || '#36d7b7'
  };
  const pegStyle = {
    boxShadow: `0 0 10px ${color || '#36d7b7'}, 0 0 5px ${color || '#36d7b7'}`
  };
  return (
    <div className='progress-wrapper'>
      <div className='bar' style={barStyle} ref={ref}>
        <div className='peg' style={pegStyle}></div>
      </div>
    </div>
  );
});

export default Progress;
