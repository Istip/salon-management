import React from 'react';

const SearchIcon = (props) => {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8536 20.1464L16.9994 16.2923C18.2445 14.882 19 13.0292 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.0292 19 14.882 18.2445 16.2923 16.9994L20.1464 20.8536C20.3417 21.0488 20.6583 21.0488 20.8536 20.8536C21.0488 20.6583 21.0488 20.3417 20.8536 20.1464ZM18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default SearchIcon;
