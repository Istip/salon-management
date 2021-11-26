import React from 'react';

const ArrowRightIcon = (props) => {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke={props.color ?? '#111'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
