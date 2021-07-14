import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import 'antd/dist/antd.less';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400&display=swap');

  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }

  body.fontLoaded {
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  span,
  button,
  label {
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5em;
    margin-bottom: 0;
  }
`;

export default GlobalStyle;
