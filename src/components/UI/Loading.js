import styled, { keyframes } from 'styled-components';
import { tokens } from '../UI/tokens';
import FlexCenter from './FlexCenter';

const Loading = (props) => {
  return (
    <Circle>
      <FlexCenter>
        <InnerCircle />
      </FlexCenter>
    </Circle>
  );
};

const Rotate = keyframes`
0% {
  transform: scale(1) rotate(0deg);
}

50% {
  transform: scale(1.5) rotate(180deg);
}

100% {
  transform: scale(1) rotate(360deg);
}
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100px;
  border: 2px solid ${tokens.colors.primary};
  border-bottom: 2px solid ${tokens.colors.primaryLight3};
  animation: ${Rotate} 1s ease infinite;
`;

const InnerCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 100px;
  border: 2px solid ${tokens.colors.primary};
  border-bottom: 2px solid ${tokens.colors.primaryLight3};
  animation: ${Rotate} 1s ease infinite;
`;

export default Loading;
