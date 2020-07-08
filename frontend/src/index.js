import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://71a3a9f9088f40b2a649906194ca05ca@o414523.ingest.sentry.io/5317117'
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
