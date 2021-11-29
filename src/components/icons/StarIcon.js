import React from 'react';

const StarIcon = (props) => {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill={props.fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 19.5083C6 19.8881 6.40674 20.1292 6.73994 19.947L12 17.0699L17.2601 19.947C17.5933 20.1292 18 19.8881 18 19.5083V6.5C18 5.11929 16.8807 4 15.5 4H8.5C7.11929 4 6 5.11929 6 6.5V19.5083ZM15.5 5C16.3284 5 17 5.67157 17 6.5V18.6649L12.2399 16.0613C12.0904 15.9796 11.9096 15.9796 11.7601 16.0613L7 18.6649V6.5C7 5.67157 7.67157 5 8.5 5H15.5Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default StarIcon;
