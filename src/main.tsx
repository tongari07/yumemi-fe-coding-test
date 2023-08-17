import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="grid h-screen place-content-center">
          エラーが発生しました。時間を置いてから画面をリロードしてください。
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
