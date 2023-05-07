import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity<{ isReady: boolean }>`
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  border-radius: 200px;
  margin-top: 30px;
  background-color: ${({ theme, isReady }) =>
    isReady ? theme.palette.primary : 'grey'};
`;
