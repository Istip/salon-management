import React from 'react';

const AddIcon = (props) => {
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
        d="M12.5 23C6.70101 23 2 18.299 2 12.5C2 6.70101 6.70101 2 12.5 2C18.299 2 23 6.70101 23 12.5C23 18.299 18.299 23 12.5 23ZM13 12H16.5C16.7761 12 17 12.2239 17 12.5C17 12.7761 16.7761 13 16.5 13H13V16.5C13 16.7761 12.7761 17 12.5 17C12.2239 17 12 16.7761 12 16.5V13H8.5C8.22386 13 8 12.7761 8 12.5C8 12.2239 8.22386 12 8.5 12H12V8.5C12 8.22386 12.2239 8 12.5 8C12.7761 8 13 8.22386 13 8.5V12ZM22 12.5C22 17.7467 17.7467 22 12.5 22C7.25329 22 3 17.7467 3 12.5C3 7.25329 7.25329 3 12.5 3C17.7467 3 22 7.25329 22 12.5Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default AddIcon;
