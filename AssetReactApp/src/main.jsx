import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
/* PrimeReact Core */
//import "primereact/resources/primereact.min.css";

/* Theme (VERY IMPORTANT) */
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Provider } from 'react-redux';
import { store } from './store.js';

/* Icons */
//import "primeicons/primeicons.css";

/* Chart.js (IMPORTANT FOR GRAPHS) */
//import "chart.js/auto";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<BrowserRouter>

    <App />
  </BrowserRouter>
  </Provider>
)
