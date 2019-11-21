import React from "react";

interface RectPlaceholderProps {
  width: number;
  height: number;
}

const RectPlaceholder: React.FC<RectPlaceholderProps> = ({ width, height }) => {
  return <div style={{ width, height }} className="--p"></div>;
};

export { RectPlaceholder };

interface CirclePlaceholderProps {
  radius: number;
}

const CirclePlaceholder: React.FC<CirclePlaceholderProps> = ({ radius }) => {
  return (
    <div
      style={{ width: radius, height: radius, borderRadius: "50%" }}
      className="--p"
    ></div>
  );
};

export { CirclePlaceholder };
