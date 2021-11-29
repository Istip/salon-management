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
        d="M12.8415 12L10.1204 8.82539C9.94066 8.61573 9.96494 8.30008 10.1746 8.12037C10.3843 7.94065 10.6999 7.96494 10.8796 8.1746L13.8796 11.6746C14.0401 11.8618 14.0401 12.1381 13.8796 12.3254L10.8796 15.8254C10.6999 16.0351 10.3843 16.0593 10.1746 15.8796C9.96494 15.6999 9.94066 15.3843 10.1204 15.1746L12.8415 12Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default ArrowRightIcon;
