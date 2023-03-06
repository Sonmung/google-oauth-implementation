import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ClientID = process.env.clientID || "Enter your Client ID Here";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ClientID}>
     <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
