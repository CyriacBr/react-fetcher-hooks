import React, { useEffect, useRef } from 'react';

export interface PlaceholderProps {
  classTarget: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ children, classTarget }) => {
  const wrapperRef = useRef();
  useEffect(() => {
    const wrapperEl = wrapperRef.current as HTMLDivElement;
    const targets = wrapperEl.parentElement.querySelectorAll(`.${classTarget}`);
    console.log('targets :', targets);
  });

  return (
    <>
      <div className="placeholder-wrapper" ref={wrapperRef}></div>
      {children}
    </>
  )
};
