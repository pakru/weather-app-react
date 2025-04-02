import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
  position: relative;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  font-size: 1.8rem;
`;

export const SettingsButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: transform 0.3s;
  
  &:hover {
    transform: rotate(30deg);
  }
`;
