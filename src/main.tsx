import { MargaretProvider } from '@tymate/margaret'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { NotificationProvider } from './components/Notification'

ReactDOM.render(
  <React.StrictMode>
    <MargaretProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </MargaretProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
