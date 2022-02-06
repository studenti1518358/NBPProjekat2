import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import 'bootstrap-icons/font/bootstrap-icons.css'
//import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <ToastProvider>
 
    <App />
    </ToastProvider>,

  document.getElementById('root')
);


