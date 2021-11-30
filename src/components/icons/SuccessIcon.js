import React from 'react';

const SuccessIcon = (props) => {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 14.7929L17.1464 8.14645C17.3417 7.95118 17.6583 7.95118 17.8536 8.14645C18.0488 8.34171 18.0488 8.65829 17.8536 8.85355L10.8536 15.8536C10.6583 16.0488 10.3417 16.0488 10.1464 15.8536L7.14645 12.8536C6.95118 12.6583 6.95118 12.3417 7.14645 12.1464C7.34171 11.9512 7.65829 11.9512 7.85355 12.1464L10.5 14.7929Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default SuccessIcon;
