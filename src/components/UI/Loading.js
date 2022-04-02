import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Ripple>
      <div />
      <div />
    </Ripple>
  );
};

const Animation = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const Ripple = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    position: absolute;
    border: 4px solid #88b8ef;
    opacity: 1;
    border-radius: 50%;
    animation: ${Animation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

export default Loading;
