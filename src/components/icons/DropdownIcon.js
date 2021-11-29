import React from 'react';

const DropdownIcon = (props) => {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1746 10.1204C15.3843 9.94066 15.6999 9.96494 15.8796 10.1746C16.0593 10.3843 16.0351 10.6999 15.8254 10.8796L12.3254 13.8796C12.1382 14.0401 11.8619 14.0401 11.6746 13.8796L8.17461 10.8796C7.96494 10.6999 7.94066 10.3843 8.12037 10.1746C8.30008 9.96494 8.61573 9.94066 8.8254 10.1204L12 12.8415L15.1746 10.1204Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default DropdownIcon;
