import { MargaretProvider } from '@tymate/margaret'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <MargaretProvider>
      <App />
    </MargaretProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
