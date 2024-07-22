import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { store, persistor } from './store/store';
import './Auth/assets/boxicons-2.0.7/css/boxicons.min.css'
import './Auth/assets/css/grid.css'
import './Auth/assets/css/theme.css'
import './Auth/assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
