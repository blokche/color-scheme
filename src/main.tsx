import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MargaretProvider } from '@tymate/margaret'

ReactDOM.render(
  <React.StrictMode>
    <MargaretProvider>
      <App />
    </MargaretProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
