import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './guide';
import { GlobalProvider } from '@/utils';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter basename="/guide">
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
