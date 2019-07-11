import React from 'react';

export interface ProgressProps {
  value: number;
  color?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, color }: ProgressProps) => {
  const barStyle = {
    transform: `translate3d(-${100 - value}%, 0px, 0px)`,
    background: color || '#36d7b7'
  };
  const pegStyle = {
    boxShadow: `0 0 10px ${color || '#36d7b7'}, 0 0 5px ${color || '#36d7b7'}`
  };
  return (
    <div className="progress-wrapper">
      <div className="bar" style={barStyle}>
        <div className="peg" style={pegStyle}></div>
      </div>
    </div>
  );
};

export default Progress;
