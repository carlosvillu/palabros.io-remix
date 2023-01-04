import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HeadProvider } from 'react-head'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HeadProvider>
      <App />
    </HeadProvider>
  </React.StrictMode>
)
