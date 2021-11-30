import React from 'react';

const MinusIcon = (props) => {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 13C6.22386 13 6 12.7761 6 12.5C6 12.2239 6.22386 12 6.5 12H17.5C17.7761 12 18 12.2239 18 12.5C18 12.7761 17.7761 13 17.5 13H6.5Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default MinusIcon;
