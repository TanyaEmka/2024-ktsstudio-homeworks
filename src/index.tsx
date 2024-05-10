import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'config/configureMobX';
import 'styles/styles.scss';
import './styles/Roboto/fonts.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if (module.hot) {
  module.hot.accept();
}
