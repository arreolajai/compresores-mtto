import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initServiceWorker } from './pwa/registerSW';
import './index.css';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
initServiceWorker();
