import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import RoverManifest from './components/RoverManifest';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.fonts.body};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  h1, h2, h3 {
    font-family: ${(props) => props.theme.fonts.heading};
    color: ${(props) => props.theme.colors.neonGreen};
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <h1>Mars Rover Manifest</h1>
        <RoverManifest roverName="Curiosity" />
        <RoverManifest roverName="Opportunity" />
        <RoverManifest roverName="Spirit" />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
