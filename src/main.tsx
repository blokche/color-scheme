import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MargaretProvider } from '@tymate/margaret';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #444;
  }
  .visually-hidden {
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;
    padding: 0;
    margin: O;
    border: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <MargaretProvider>
      <GlobalStyle />
      <App />
    </MargaretProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
