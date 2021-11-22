import React from 'react';

const ProfileIcon = (props) => {
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
        d="M1.99976 11.9997C1.99976 6.4767 6.47676 1.99969 11.9998 1.99969C17.5228 1.99969 21.9998 6.4767 21.9998 11.9997C21.9998 17.5227 17.5228 21.9997 11.9998 21.9997C6.47676 21.9997 1.99976 17.5227 1.99976 11.9997ZM15.0778 14.9407L18.5348 16.5117C18.8638 16.6617 19.1528 16.8787 19.3848 17.1457C20.4028 15.6867 20.9998 13.9127 20.9998 11.9997C20.9998 7.0297 16.9708 2.99969 11.9998 2.99969C7.02976 2.99969 2.99976 7.0297 2.99976 11.9997C2.99976 13.9127 3.59676 15.6867 4.61576 17.1457C4.84776 16.8787 5.13676 16.6617 5.46576 16.5117L8.92276 14.9407C7.75176 14.0257 6.99976 12.6007 6.99976 10.9997C6.99976 8.2387 9.23876 5.99969 11.9998 5.99969C14.7618 5.99969 16.9998 8.2387 16.9998 10.9997C16.9998 12.6007 16.2478 14.0257 15.0778 14.9407ZM11.9998 6.99969C9.79076 6.99969 7.99976 8.79069 7.99976 10.9997C7.99976 13.2087 9.79076 14.9997 11.9998 14.9997C14.2088 14.9997 15.9998 13.2087 15.9998 10.9997C15.9998 8.79069 14.2088 6.99969 11.9998 6.99969ZM11.9998 20.9997C9.31276 20.9997 6.90176 19.8227 5.25176 17.9557C5.40576 17.7247 5.62176 17.5387 5.87976 17.4227L9.96176 15.5667C10.5838 15.8447 11.2738 15.9997 11.9998 15.9997C12.7258 15.9997 13.4158 15.8447 14.0388 15.5667L18.1208 17.4227C18.3778 17.5387 18.5938 17.7247 18.7478 17.9557C17.0988 19.8227 14.6868 20.9997 11.9998 20.9997Z"
        fill={props.color ?? '#111'}
      />
    </svg>
  );
};

export default ProfileIcon;
