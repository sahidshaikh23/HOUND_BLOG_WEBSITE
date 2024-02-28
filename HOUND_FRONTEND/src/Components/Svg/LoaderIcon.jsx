import React, { useEffect, useState } from "react";

function LoaderIcon({ style }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 2) % 360);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const svgStyle = {
    ...style,
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.01s linear",
  };
  return (
    <svg
      xmlSpace="preserve"
      viewBox="0 0 100 100"
      y="0"
      x="0"
      xmlns="http://www.w3.org/2000/svg"
      id="圖層_1"
      version="1.1"
      width="251px"
      height="251px"
      style={svgStyle}
    >
      <g
        className="ldl-scale"
      >
        <path
          fill="#a0c8d7"
          d="M61.395 30.204a22.908 22.908 0 0 1 6.063 5.088l7.212-6.051a32.343 32.343 0 0 0-8.568-7.19c-4.738-2.742-10.235-4.319-16.103-4.319s-11.365 1.577-16.103 4.319a32.359 32.359 0 0 0-8.568 7.19l7.212 6.051a22.87 22.87 0 0 1 6.063-5.088l5.702 9.876a11.334 11.334 0 0 1 11.388 0l5.702-9.876z"
        />
        <path
          fill="#abbd81"
          d="M44.25 59.598a11.328 11.328 0 0 1-5.694-9.863H27.152c.003-2.665.47-5.305 1.375-7.795l-8.846-3.22a32.358 32.358 0 0 0-1.943 11.015 32.052 32.052 0 0 0 4.311 16.105 32.04 32.04 0 0 0 11.792 11.786 32.35 32.35 0 0 0 10.511 3.825l1.635-9.271a22.869 22.869 0 0 1-7.438-2.707l5.701-9.875z"
        />
        <path
          fill="#f47e60"
          d="M80.055 38.871l-8.846 3.22a22.88 22.88 0 0 1 1.375 7.795H61.18a11.335 11.335 0 0 1-5.694 9.863l5.702 9.876a22.9 22.9 0 0 1-7.438 2.707l1.635 9.271a32.357 32.357 0 0 0 10.511-3.825 32.05 32.05 0 0 0 11.792-11.787 32.042 32.042 0 0 0 4.311-16.105 32.36 32.36 0 0 0-1.944-11.015z"
        />
        <circle
          fill="#f5e6c8"
          r="11.893"
          cy="17.402"
          cx="49.999"
        />
        <circle
          r="11.893"
          fill="#f5e6c8"
          cy="66.005"
          cx="21.763"
          transform="rotate(-30 21.76 66.006)"
        />
        <circle
          r="11.893"
          fill="#f5e6c8"
          cy="66.157"
          cx="77.973"
          transform="rotate(-60 77.974 66.159)"
        />
      </g>
    </svg>
  );
}

export default LoaderIcon;